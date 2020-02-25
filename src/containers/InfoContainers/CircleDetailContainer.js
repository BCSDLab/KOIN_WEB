import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCircleDetailInfo } from '../../modules/circle';
import CircleDetail from '../../components/InfoComponents/CircleDetail';

export default function CircleDetailContainer({ id }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.circleReducer.circle);

  useEffect(() => {
    dispatch(getCircleDetailInfo(id));
  }, [dispatch, id]);

  return (
    <CircleDetail
      circle={data}
      loading={loading}
      error={error}
    />
  )
}
