import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../modules/board';
import Posts from '../../components/BoardComponents/Posts';
import HotPosts from '../../components/BoardComponents/HotPosts';

export default function PostListContainer({ history, match }) {
  const dispatch = useDispatch();
  const { posts, totalPageNum, displayPageNum, displayMinNum } = useSelector(state => state.boardReducer);
  const [title, setTitle] = useState('');
  const [pageNum, setPageNum] = useState(sessionStorage.getItem("boardPageNum") || 1);
  const [boardId, setBoardId] = useState(0);
  const [path, setPath] = useState('');

  const getPostList = pageNum => {
    console.log(pageNum);
    dispatch(getPosts({
      pageNum,
      boardId: sessionStorage.getItem("boardId")
    }));
  }
  
  useEffect(() => {
    setBoardId(sessionStorage.getItem("boardId"));
  }, []);

  useEffect(() => {
    if (match) {
      if (match.url !== path) {
        console.log(path, match.url);
        setPath(match.url);
        setPageNum(1);
        sessionStorage.setItem("boardPageNum", 1);
        getPostList(pageNum);
      }
    }
  },[match]);

  return (
    <Posts
      history={history}
      path={match.url}
      posts={posts.data}
      loading={posts.loading}
      error={posts.error}
      totalPageNum={totalPageNum}
      displayPageNum={displayPageNum}
      displayMinNum={displayMinNum}
      getPostList={getPostList}
    />
  )
}
