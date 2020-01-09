import React, { useState, useEffect } from 'react'
import RoomList from '../components/RoomList';
import { useSelector, useDispatch } from 'react-redux';
import { getRoomList } from '../modules/room';

export default function RoomListContainer({ history }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.roomReducer.rooms);

  const [marker, setMarker] = useState({
    id: null,
    isActive: false
  });

  const onMouseOverMarker = id => {
    setMarker({
      id: id,
      isActive: true
    })
  }

  const onMouseOutMarker = () => {
    setMarker({
      id: null,
      isActive: false
    })
  }

  useEffect(() => {
    dispatch(getRoomList());
  }, [dispatch]);

  return (
    <RoomList
      roomList={data}
      loading={loading}
      marker={marker}
      onMouseOverMarker={onMouseOverMarker}
      onMouseOutMarker={onMouseOutMarker}
      history={history}
    />
  )
}
