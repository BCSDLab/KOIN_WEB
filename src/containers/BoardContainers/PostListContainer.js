import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../modules/board';
import Posts from '../../components/BoardComponents/Posts';
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';

export default function PostListContainer({ history, match }) {
  const dispatch = useDispatch();
  const { posts, totalPageNum, displayPageNum, displayMinNum } = useSelector(state => state.boardReducer);
  const [boardId, setBoardId] = useState(0);
  const [path, setPath] = useState('');

  const getPostList = page => {
    console.log(page);
    dispatch(getPosts({
      pageNum: page,
      boardId: sessionStorage.getItem("boardId")
    }));
  }
  
  // 게시판 진입 시
  useEffect(() => {
    setBoardId(sessionStorage.getItem("boardId"));
    if (!sessionStorage.getItem("bpn")) {
      console.log("세션에 페이지 없을 때");
      getPostList(1);
      const boardPageNum = {
        'free': 1,
        'job': 1,
        'anonymous': 1,
        'question': 1,
        'notice': 1,
        'promotion': 1
      }
      sessionStorage.setItem("bpn", JSON.stringify(boardPageNum));
    } else {
      console.log("세션에 페이지 있을 때");
      const boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
      getPostList(boardPageNum[match.params.type])
    }
  }, []);

  // 게시판 -> 다른 게시판 이동 시 path 변경.
  useEffect(() => {
    if (match) {
      if (match.url !== path) {
        console.log("게시판 -> 다른 게시판");
        console.log(match.params.type);
        setPath(match.url);
        const boardPageNum = JSON.parse(sessionStorage.getItem("bpn"));
        getPostList(boardPageNum[match.params.type]);
      }
    }
  },[match]);

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
