import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../modules/board';
import Posts from '../../components/BoardComponents/Posts';
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';
import { useLastLocation } from 'react-router-last-location';
import PropTypes from "prop-types";

function PostListContainer({ history, match }) {
  const dispatch = useDispatch();
  const { posts, totalPageNum, displayPageNum, displayMinNum } = useSelector(state => state.boardReducer);
  const lastLocation = useLastLocation();
  const getPostList = page => {
    console.log(page, sessionStorage.getItem("boardId"));
    dispatch(getPosts({
      pageNum: page,
      boardId: sessionStorage.getItem("boardId")
    }));
  }

  // 게시판 진입 시
  useEffect(() => {
    switch(match.params.type) {
      case 'notice':
        sessionStorage.setItem("boardId", 4);
        break;
      case 'free':
        sessionStorage.setItem("boardId", 1);
        break;
      case 'job':
        sessionStorage.setItem("boardId", 2);
        break;
      case 'question':
        sessionStorage.setItem("boardId", 10);
        break;
      case 'anonymous':
        sessionStorage.setItem("boardId", -1);
        break;
      default:
        sessionStorage.setItem("boardId", 1);
        break;
    }
    if (!sessionStorage.getItem("bpn")) {
      console.log("세션에 페이지 없을 때");

      const boardPageNum = {
        'free': 1,
        'job': 1,
        'anonymous': 1,
        'question': 1,
        'notice': 1,
        'promotion': 1
      }
      sessionStorage.setItem("bpn", JSON.stringify(boardPageNum));
      getPostList(1);
    } else {
      // 게시판 -> 다른 게시판 이동 or 다른 서비스 -> 게시판 이동
      console.log("세션에 페이지 있을 때");
      const boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
      getPostList(boardPageNum[match.params.type])
    }
  }, []);

  // 게시판 -> 다른 게시판 이동 시 data 변경.
  // useEffect(() => {
  //   if (lastLocation && !lastLocation.pathname.indexOf('/board')) {
  //     if (!lastLocation.pathname.includes(match.url)) {
  //       console.log("게시판 -> 다른 게시판");
  //       const boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
  //       getPostList(boardPageNum[match.params.type]);
  //     }
  //   }
  // },[match]);

  return (
    <>
      <Header
        match={match}
        history={history}>
        <ButtonGroup
          match={match}
          history={history}
        />
      </Header>
      <Posts
        history={history}
        path={match.params.type}
        posts={posts.data}
        loading={posts.loading}
        error={posts.error}
        totalPageNum={totalPageNum}
        displayPageNum={displayPageNum}
        displayMinNum={displayMinNum}
        getPostList={getPostList}
      />
    </>
  )
}

PostListContainer.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default PostListContainer
