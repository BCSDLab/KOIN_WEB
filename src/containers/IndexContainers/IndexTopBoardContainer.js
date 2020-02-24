import React, {useEffect, useState} from "react";
import IndexTopBoard from "../../components/IndexComponents/IndexTopBoard";
import {useDispatch, useSelector} from "react-redux";
import {getHotPosts, getPosts} from "../../modules/board";

export default function IndexTopBoardContainer({history}) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.boardReducer.hotPosts);
  const { posts } = useSelector(state => state.boardReducer);
  const [hotBoardList, setHotBoardList] = useState([]);
  const [stack, setStack] = useState(0);
  const [newBoardList, setNewBoardList] = useState([]);

  useEffect(() => {
    dispatch(getHotPosts());
    dispatch(getPosts({pageNum: 1, boardId: 1}));
    dispatch(getPosts({pageNum: 1, boardId: 2}));
    dispatch(getPosts({pageNum: 1, boardId: 10}));
    setStack(1);
  }, [dispatch]);

  useEffect(() => {
    setHotBoardList(data);
  },[data])

  useEffect(() => {
    setNewBoardList()
  }, [posts])

  useEffect(() => {

  },[stack])

  return(
    <IndexTopBoard
      history={history}
      hotBoardList={hotBoardList}
      newBoardList={[]}
    />
  )
}
