import React, { useEffect } from 'react'
import RoomList from '../../components/InfoComponents/RoomList';
import { useSelector, useDispatch } from 'react-redux';
import { getRoomList } from '../../modules/room';

export default function RoomListContainer({ history }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.roomReducer.rooms);

  useEffect(() => {
    dispatch(getRoomList());
  }, [dispatch]);

  return (
    <RoomList
      roomList={data.lands || []}
      loading={loading}
      history={history}
    />
  )
}
