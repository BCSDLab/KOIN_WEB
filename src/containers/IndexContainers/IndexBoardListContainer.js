import React, {useEffect, useState} from "react";
import IndexBoardList from "../../components/IndexComponents/IndexBoardList";
import {useDispatch, useSelector} from "react-redux";
import {getHotPosts, getNewPosts} from "../../modules/board";

export default function IndexBoardListContainer({history}) {
  const dispatch = useDispatch();
  const {notice, loading, error} = useSelector(state => state.boardReducer.newPosts);
  const [selectedBoard, selectBoard] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    dispatch(getHotPosts());
    dispatch(getNewPosts());
  }, []);

  useEffect(()=> {
    switch (selectedBoard) {
      case 0:
        return setArticles(notice.slice(0,7));
      // case 1:
      //   return setArticles(free);
      // case 2:
      //   return setArticles(job);
      // case 3:
      //   return setArticles(anonymous);
      // case 4:
      //   return setArticles(question);
    }
  },[selectedBoard, notice]);

  return (
    <IndexBoardList
      history={history}
      boardList={["공지사항"]}
      selectedBoard={selectedBoard}
      selectBoard={selectBoard}
      articles={articles}/>
  )
}
