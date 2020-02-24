import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getRoomDetailInfo } from '../../modules/room';
import RoomDetail from '../../components/InfoComponents/RoomDetail';
import options from '../../static/roomOptions';

export default function RoomDetailContainer({ id }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.roomReducer.room);
  const [imgIdx, setImgIdx] = useState(0);

  const setNext = length => {
    if (imgIdx === length - 1) {
      alert("마지막 이미지입니다.");
    } else {
      setImgIdx(imgIdx + 1);
    }
  }

  const setPrev = () => {
    if (imgIdx === 0) {
      alert("첫 이미지입니다.");
    } else {
      setImgIdx(imgIdx - 1);
    }
  }
  useEffect(() => {
    dispatch(getRoomDetailInfo(id));
  }, [dispatch]);
  
  
  return (
    <RoomDetail
      room={data}
      loading={loading}
      options={options}
      imgIdx={imgIdx}
      setNext={setNext}
      setPrev={setPrev}
    />
  )
}
