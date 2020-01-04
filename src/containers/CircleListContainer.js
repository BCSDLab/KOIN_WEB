import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCircleList, getCircleListByCategory } from '../modules/circle';
import * as CATEGORY from '../static/circleCategory';
import CircleList from '../components/CircleList';

export default function CircleListContainer() {
  const [tag, setTag] = useState(sessionStorage.getItem("circleCategory"));
  const [categoryIndex, setCategoryIndex] = useState("ALL");
  const dispatch = useDispatch();
  const { filteredCircleList, loading, error } = useSelector(state => state.circleReducer);

  const selectCategory = useCallback(tag => {
    setTag(tag);
    sessionStorage.setItem("circleCategory", tag);
    dispatch(getCircleListByCategory(tag));
  }, [dispatch, setTag])

  const onMouseOverCategory = index => {
    setCategoryIndex(index);
  };

  const onMouseOutCategory = () => {
    setCategoryIndex("ALL");
  };

  useEffect(() => {
    dispatch(getCircleList(tag))
  }, [dispatch]);

  return (
    <CircleList
      tag={tag}
      categories={CATEGORY.default}
      circleList={filteredCircleList}
      loading={loading}
      error={error}
      selectCategory={selectCategory}
      onMouseOverCategory={onMouseOverCategory}
      onMouseOutCategory={onMouseOutCategory}
      categoryIndex={categoryIndex}
    />
  )
}
