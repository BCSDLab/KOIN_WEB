import React, {useEffect, useState} from "react";
import IndexTopBoard from "../../components/IndexComponents/IndexTopBoard";
import {useDispatch, useSelector} from "react-redux";
import {getHotPosts, getNewPosts} from "../../modules/board";

export default function IndexTopBoardContainer({history}) {
  const dispatch = useDispatch();
  const { hotPosts, newPosts, loading, error } = useSelector(state => state.boardReducer);
  const [hotBoardList, setHotBoardList] = useState([]);
  const [stack, setStack] = useState(0);
  const [newBoardList, setNewBoardList] = useState([]);

  useEffect(() => {
    dispatch(getHotPosts());
    dispatch(getNewPosts());
    setStack(1);
  }, []);

  useEffect(() => {
    setHotBoardList(hotPosts.data);
  },[hotPosts.data])

  useEffect(() => {

  }, [newPosts.data])

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
