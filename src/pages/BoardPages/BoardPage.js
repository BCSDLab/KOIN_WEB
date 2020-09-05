import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import PostListContainer from '../../containers/BoardContainers/PostListContainer';
import PostDetailContainer from '../../containers/BoardContainers/PostDetailContainer';

import HotPosts from '../../components/BoardComponents/HotPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getHotPosts } from '../../modules/board';
import styled from 'styled-components';

const Container = styled.section`
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
    <div>
      <Container>
        <Row>
          <Switch>
            {!id && <Route exact path={match.path} component={(PostListContainer)} />}
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
    </div>
  )
}
