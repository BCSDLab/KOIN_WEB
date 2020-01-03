import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getCircleList, getCircleListByCategory } from '../modules/circle';
import * as CATEGORY from '../static/circleCategory';
import CircleList from '../components/CircleList';

export default function CircleListContainer() {
  const [tag, setTag] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const dispatch = useDispatch();
  const { filteredCircleList, loading, error } = useSelector(state => state.circleReducer);

  const selectCategory = tag => {
    setTag(tag);
    dispatch(getCircleListByCategory(tag));
  }

  const onMouseOverCategory = index => {
    setCategoryIndex(index);
  }

  const onMouseOutCategory = () => {
    setCategoryIndex(null);
  }

  useEffect(() => {
    dispatch(getCircleList());
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
