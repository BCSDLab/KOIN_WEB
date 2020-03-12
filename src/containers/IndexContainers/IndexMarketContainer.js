import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IndexMarketItem from '../../components/IndexComponents/IndexMarketItem';
import { getLatestItems } from '../../modules/market';

export default function IndexMarketContainer({ history }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.marketReducer.items);

  useEffect(() => {
    dispatch(getLatestItems());
  }, []);

  useEffect(() => {
    console.log(data, loading, error);
  }, [data, loading, error]);

  return (
    <IndexMarketItem
      history={history}
      items={data}
      loading={loading}
      error={error}
    />
  )
}
