import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import PostRegisterContainer from '../../containers/BoardContainers/PostRegisterContainer';
import PostListContainer from '../../containers/BoardContainers/PostListContainer';
import PostEditContainer from '../../containers/BoardContainers/PostEditContainer';
import PostDetailContainer from '../../containers/BoardContainers/PostDetailContainer';
import HotPosts from '../../components/BoardComponents/HotPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getHotPosts } from '../../modules/board';
import styled from 'styled-components';
import Header from '../../components/BoardComponents/Header';
import withPost from '../../components/BoardComponents/withPost';

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
  const { id } = match.params;

  useEffect(() => {
    dispatch(getHotPosts());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Row>
          <Header
            match={match}
            history={history}
          />
          {!id && <Route exact path={match.path} component={(PostListContainer)} />}
          {id === 'register' && <Route exact path={match.path} component={PostRegisterContainer} />}
          {id === 'revise' && <Route path={match.path} component={PostEditContainer} />}
          {Number.isInteger(parseInt(id)) && <Route path={match.path} component={PostDetailContainer} />}
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
