import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { findPassword, resetError } from '../../modules/auth';
import FindPwForm from '../../components/UserComponents/FindPwForm';
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';

export default function FindPasswordContainer() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [findSuccess, setFindSuccess] = useState(false);
  const { data, loading, error } = useSelector(state => state.authReducer.inquiry);
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;
  const [dialog, setDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: "alert",
    title: "",
    contents: ""
  })
  
  const onChange = e => {
    setUserId(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    if (userId.indexOf("@koreatech.ac.kr") !== -1) {
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        contents: "@koreatech.ac.kr은 빼고 입력해주세요."
      })
      return;
    }
    setUserId(userId.trim());
    if (!emailLocalPartRegex.test(userId)) {
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        contents: "아우누리 계정 형식이 아닙니다."
      })
      return;
    }
    if (!userId) {
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        contents: "계정명을 입력하세요."
      })
      return;
    }
    dispatch(findPassword(userId));
  }

  const onConfirm = () => {
    setDialog(false);
  }

  useEffect(() => {
    if (error) {
      setDialog(true);
      if (error.status === 404) {
        setDialogInfo({
          ...dialogInfo,
          contents: "유효하지 않은 계정명입니다."
        })
      } else if (error.status === 422) {
        setDialogInfo({
          ...dialogInfo,
          contents: "계정 형식에 맞지 않습니다."
        })
      } else {
        setDialogInfo({
          ...dialogInfo,
          contents: "네트워크 연결을 확인해주세요.zz"
        })
      }
    }
    if (data) {
      if (data.statusText === 'Created' && data.status === 201) {
        setFindSuccess(true);
        setDialog(true);
        setDialogInfo({
          ...dialogInfo,
          contents: "아우누리 이메일로 비밀번호 변경 메일을 보냈습니다. 확인 부탁드립니다."
        })
      }
    }
  }, [error, data]);

  return (
    <Container>
      <FindPwForm
        userId={userId}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={loading}
        dialogInfo={dialogInfo}
        visible={dialog}
        onConfirm={onConfirm}
        findSuccess={findSuccess}
      />
      <CopyRight />
    </Container>
    
  )
}
