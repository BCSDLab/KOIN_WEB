import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCircleList } from '../../modules/circle';
import * as CATEGORY from '../../static/circleCategory';
import CircleList from '../../components/InfoComponents/CircleList';

export default function CircleListContainer() {
  const [tag, setTag] = useState(sessionStorage.getItem("circleCategory") || "ALL");
  const [categoryIndex, setCategoryIndex] = useState("ALL");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.circleReducer.circles);

  const selectCategory = useCallback(tag => {
    setTag(tag);
    sessionStorage.setItem("circleCategory", tag);
  }, [])

  const onMouseOverCategory = index => {
    setCategoryIndex(index);
  };

  const onMouseOutCategory = () => {
    setCategoryIndex("ALL");
  };

  const _filter = useCallback((list = []) => {
    let new_list;
    if (tag === 'ALL') return new_list = list;
    else new_list = list.filter(c => c.category === tag);
    return new_list;
  }, [tag]);

  useEffect(() => {
    dispatch(getCircleList(tag))
  }, [dispatch]);

  return (
    <CircleList
      tag={tag}
      categories={CATEGORY.default}
      circleList={_filter(data.circles) || []}
      loading={loading}
      error={error}
      selectCategory={selectCategory}
      onMouseOverCategory={onMouseOverCategory}
      onMouseOutCategory={onMouseOutCategory}
      categoryIndex={categoryIndex}
    />
  )
}
