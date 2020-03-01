import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import PostRegisterContainer from '../../containers/BoardContainers/PostRegisterContainer';
import PostListContainer from '../../containers/BoardContainers/PostListContainer';
import PostEditContainer from '../../containers/BoardContainers/PostEditContainer';
import PostDetailContainer from '../../containers/BoardContainers/PostDetailContainer';

import PromotionListContainer from '../../containers/PromotionContainers/PromotionListContainer';
import PromotionDetailContainer from '../../containers/PromotionContainers/PromotionDetailContainer';
import PromotionEditContainer from '../../containers/PromotionContainers/PromotionEditContainer';

import HotPosts from '../../components/BoardComponents/HotPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getHotPosts } from '../../modules/board';
import styled from 'styled-components';

const Container = styled.div`
  margin: 61px auto 0 auto;
  width: 1132px;

  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0;
  }
`;

const Row = styled.div`
  width: 834px;
  float: left;
  margin-right: 40px;
  margin-bottom: 60px;

  @media (max-width: 576px) {
    width: 100%;
    min-height: calc(100vh - 115px);
    margin: 0;
  }
`;

export default function BoardPage({ history, match }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.boardReducer.hotPosts);
  const { type, id } = match.params;


  useEffect(() => {
    dispatch(getHotPosts());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Row>
          <Switch>
            {type === 'promotion' && (
              <>
                {!id && <Route exact path={match.path} component={PromotionListContainer} />}
                {id === 'register' && <Route exact path={match.path} component={PromotionRegisterContainer} />}
                {Number.isInteger(parseInt(id)) && <Route path={match.path} component={PromotionDetailContainer} />}
              </>
            )}
            {!id && <Route exact path={match.path} component={(PostListContainer)} />}
            {id === 'register' && <Route exact path={match.path} component={PostRegisterContainer} />}
            {id === 'edit' && <Route path={match.path} component={PostEditContainer} />}
            {Number.isInteger(parseInt(id)) && <Route path={match.path} component={PostDetailContainer} />}
          </Switch>
        </Row>
      </Container>
      <HotPosts
        hotPosts={data}
        loading={loading}
        error={error}
        history={history}
      />
    </>
  )
}
