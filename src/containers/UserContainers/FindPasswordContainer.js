import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { findPassword } from '../../modules/auth';
import FindPwForm from '../../components/UserComponents/FindPwForm';
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';
import { useToasts } from 'react-toast-notifications';

export default function FindPasswordContainer() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [findSuccess, setFindSuccess] = useState(false);
  const { data, authInProgress, error } = useSelector(state => state.authReducer);
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;

  const onChange = e => {
    setUserId(e.target.value);
  }

  const onSubmit = useCallback(e => {
    e.preventDefault();
    if (userId.indexOf("@koreatech.ac.kr") !== -1) {
      addToast('계정명은 @koreatech.ac.kr을 빼고 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (!userId.trim()) {
      addToast('계정명을 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (!emailLocalPartRegex.test(userId.trim())) {
      addToast('아우누리 계정 형식이 아닙니다.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    dispatch(findPassword({
      userId
    }));
  }, [userId]);

  useEffect(() => {
    if (error) {
      if (error.status === 404) {
        addToast('존재하지 않는 계정입니다.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else if (error.status === 422) {
        addToast('아우누리 계정 형식이 아닙니다.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else {
        addToast('네트워크 연결을 확인해주세요.', {
          appearance: 'error',
          autoDismiss: true
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (data && data.status === 201) {
      addToast('비밀번호 초기화 메일을 전송했습니다. 아우누리에서 확인해주세요.', {
        appearance: 'success',
        autoDismiss: true
      });
      setFindSuccess(true);
    }
  }, [data]);

  return (
    <Container>
      <FindPwForm
        userId={userId}
        onChange={onChange}
        onSubmit={onSubmit}
        authInProgress={authInProgress}
        findSuccess={findSuccess}
      />
      <CopyRight />
    </Container>

  )
}
