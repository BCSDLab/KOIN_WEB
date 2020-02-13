import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import LostItemList from "../components/LostItemList";
import {getLostItems} from "../modules/lost";

export default function LostItemListContainer({history}) {
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [maxDisplayPageNum, setMaxDisplayPageNum] = useState(1);
  const {data, loading, error} = useSelector(state => state.lostReducer.lostItems)

  const dispatch = useDispatch();

  const setPageData = page => {
    dispatch(getLostItems(page));
  };

  useEffect(() => {
    dispatch(getLostItems(1));
  },[dispatch]);

  useEffect(() => {
    setTotalPageNum(data.totalPage);
    if(data.totalPage >= 5){
      setMaxDisplayPageNum(5)
    }
    else{
      setMaxDisplayPageNum(data.totalPage)
    }
  }, [data]);

  return (
    <LostItemList
      lostItems={data.lostItems}
      totalPageNum={totalPageNum}
      setPageData={setPageData}
      maxDisplayPageNum={maxDisplayPageNum}
      history={history}/>
  )
}
