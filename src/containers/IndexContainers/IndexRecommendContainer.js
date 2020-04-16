import React, {useCallback, useEffect, useState} from "react";
import IndexRecommend from "../../components/IndexComponents/IndexRecommend";
import {getStoreList} from '../../modules/store';
import {useDispatch, useSelector} from "react-redux";

export default function IndexRecommendContainer({history}) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.storeReducer.stores);
  const [storeList, setStoreList] = useState([{delivery:"", pay_card:"", pay_bank:"", open_time:"", close_time:"", phone:"" ,name:""}]);
  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    dispatch(getStoreList());
  },[]);

  useEffect(() => {
    setStoreList(data.filter(value => !(value.category === "S000" || value.category === "S001" || value.category === "S009")));
  },[data]);

  useEffect(() => {
    setRandomNum(Math.floor(Math.random()*(storeList.length)))
  }, [storeList]);

  useEffect(() => {
    console.log(storeList[randomNum]);
  },[randomNum]);

  function clickRefresh () {
    setRandomNum(Math.floor(Math.random()*(storeList.length)));
  }

  return (
    <IndexRecommend
      history={history}
      storeData={storeList[randomNum]}
      clickRefresh={clickRefresh}
    />
  )
}
