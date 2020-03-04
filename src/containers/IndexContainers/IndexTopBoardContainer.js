import React, {useEffect, useState} from "react";
import IndexTopBoard from "../../components/IndexComponents/IndexTopBoard";
import {useDispatch, useSelector} from "react-redux";
import {getHotPosts, getNewPosts} from "../../modules/board";
import useMobileFlag from "../../hooks/useMobileFlag";

export default function IndexTopBoardContainer({history}) {
  const dispatch = useDispatch();
  const { hotPosts, loading, error } = useSelector(state => state.boardReducer);
  const { free, job, anonymous, question } = useSelector(state => state.boardReducer.newPosts);
  const [hotBoardList, setHotBoardList] = useState([]);
  const [newBoardList, setNewBoardList] = useState();
  const mobileFlag = useMobileFlag();

  useEffect(() => {
    dispatch(getHotPosts());
    dispatch(getNewPosts());
  }, []);

  useEffect(() => {
    setHotBoardList(hotPosts.data);
  },[hotPosts.data])

  useEffect(() => {
    setNewBoard(free.concat(job).concat(anonymous).concat(question))
  },[free])

  function setNewBoard(list) {
    let articles = list;
    articles.map((data,id) => {
      articles[id].created_at = (data.created_at.replace(' ','T'))
    });
    // 시간 순 정렬
    setNewBoardList(articles.sort(function(a,b){
      return new Date(b.created_at) - new Date(a.created_at)
    }).splice(0, 4));
  }

  useEffect(() => {
    console.log(newBoardList)
  },[newBoardList])

  return(
    <IndexTopBoard
      history={history}
      mobileFlag={mobileFlag}
      hotBoardList={hotBoardList}
      newBoardList={newBoardList}
    />
  )
}
