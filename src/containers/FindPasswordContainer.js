import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { findPassword } from '../modules/auth';
import FindPwForm from '../components/FindPwForm';

export default function FindPasswordContainer() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [findSuccess, setFindSuccess] = useState(false);
  const { result, loading, error } = useSelector(state => state.authReducer);
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;

  const onChange = e => {
    setUserId(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    if (userId.indexOf("@koreatech.ac.kr") !== -1) {
      alert("@koreatech.ac.kr은 빼고 입력해주세요.");
      return;
    }
    setUserId(userId.trim());
    if (!emailLocalPartRegex.test(userId)) {
      alert("아우누리 계정 형식이 아닙니다.");
      return;
    }
    if (!userId) {
      alert("ID를 입력해주세요.");
      return;
    }
    dispatch(findPassword(userId));
  }
  
  useEffect(() => {
    if (error) {
      if (error.message.indexOf("422") !== -1) {
        alert("계정 형식에 맞지 않습니다.");
      } else if (error.message.indexOf("404") !== -1) {
        alert("유효하지 않은 ID입니다.");
      } else {
        alert("네트워크 연결을 확인해주세요.");
      }
    }
    if (result) {
      setFindSuccess(true);
      if (result.status === 200 || result.status === 201) {
        alert("아우누리 이메일로 비밀번호 메일을 보냈습니다. 확인 부탁드립니다.");
      }
    }
  }, [error, result]);
  return (
    <FindPwForm
      userId={userId}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      findSuccess={findSuccess}
    />
  )
}
