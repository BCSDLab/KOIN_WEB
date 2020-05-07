import React, { useState, useEffect, useCallback } from 'react'
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';
import ModifyForm from '../../components/UserComponents/ModifyForm';
import majorList from '../../static/major';
import { useSelector, useDispatch } from 'react-redux';
import { modifyInfo, checkNickname, withdraw } from '../../modules/auth';
import { useToasts } from 'react-toast-notifications';

export default function ModifyInfoContainer() {
  const { addToast } = useToasts();
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const passwordRegex = /(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[`₩~!@#$%<>^&*()\-=+_?<>:;"',.{}|[\]\/\\]).+/g;
  const emailRegex =  /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const studentNumberRegex = /^\d{10}$/;
  const nicknameRegex = /admin|관리자/;
  const dispatch = useDispatch();
  const parsedUserInfo = !!sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo"));
  const [userInfo, setUserInfo] = useState({
    userId: parsedUserInfo.portal_account,
    firstPassword: "",
    secondPassword: "",
    name: parsedUserInfo.name || "",
    nickname: parsedUserInfo.nickname || "",
    gender: parsedUserInfo.gender === undefined ? "" : parsedUserInfo.gender,
    studentNumber: parsedUserInfo.student_number || "",
    phoneNumber: parsedUserInfo.phone_number || "",
    major: parsedUserInfo.major || "",
    identity: parsedUserInfo.identity,
    isGraduated: parsedUserInfo.is_graduated,
    email: parsedUserInfo.email || ""
  });

  const [dropdown, setDropdown] = useState(false);
  const { data, isAvailable, authInProgress, checkInProgress, error, nicknameCheckError } = useSelector(state => state.authReducer);

  const onModify = useCallback(e => {
    e.preventDefault();
    const { userId, firstPassword, secondPassword, phoneNumber, nickname,
      name, studentNumber, gender, major, identity, isGraduated, email } = userInfo;
    if (firstPassword === "" && firstPassword === secondPassword) {
      addToast('기존 비밀번호가 그대로 사용됩니다.', {
        appearance: 'info',
        autoDismiss: true
      });
    } else {
      if (firstPassword !== secondPassword) {
        addToast('입력하신 비밀번호가 일치하지 않습니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      if (firstPassword.length < 6 || firstPassword.length > 18) {
        addToast('비밀번호는 6자 이상 18자 이하여야 합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      if (!passwordRegex.test(firstPassword)) {
        addToast('비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 사용해야 합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
    }
    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      addToast('전화번호 양식을 지켜주세요. (Ex: 010-0000-0000)', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (studentNumber) {
      if (studentNumber.length !== 10 || !studentNumberRegex.test(studentNumber)) {
        addToast('학번은 열자리 숫자여야 합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      const year = studentNumber.substring(0, 4);
      const majorCode = studentNumber.substring(4, 7);

      if (year < 1992 || year > new Date().getFullYear()) {
        addToast('올바른 입학년도가 아닙니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      for(let major of majorList) {
        if (major.codes.includes(majorCode)) {
          break;
        } else {
          if (major.id === 7) {
            addToast('올바른 학부코드가 아닙니다.', {
              appearance: 'warning',
              autoDismiss: true
            });
            return;
          } else {
            continue;
          }
        }
      }
    }
    // 기존 닉네임과 다를 때만 검사
    if (parsedUserInfo.nickname !== nickname) {
      // 닉네임이 있는데 없앨 경우
      if (parsedUserInfo.nickname && !nickname) {
        addToast('닉네임을 입력해주세요.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      if (nickname && !isAvailable) {
        addToast('닉네임 중복확인을 해주세요.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      if (nickname.length > 10) {
        addToast('닉네임은 10자리 이하여야 합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
    }

    if(identity === 5 && email && !emailRegex.test(email)) {
      addToast('이메일 형식을 지켜주세요', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    const payload = {
      // 필수정보
      portal_account: userId,
      password: firstPassword,
      // 옵션
      name: name || undefined,
      nickname: nickname || undefined,
      gender: gender,
      major: major || undefined,
      // 점주 계정일 경우 student_number을 실어 요청을 보내면 에러 발생
      student_number: studentNumber && identity !== 5 ? studentNumber : undefined,
      phone_number: phoneNumber || undefined,
      email: (email || email === "") && identity === 5 ? email : undefined,
      identity: identity,
      is_graduated: isGraduated
    }
    console.log(payload)
    dispatch(modifyInfo({
      userInfo: payload,
      token: sessionStorage.getItem("token")
    }));
  }, [dispatch, userInfo, isAvailable, parsedUserInfo.nickname]);

  const onWithdraw = useCallback(() => {
    if (window.confirm("데이터 복구는 불가능합니다. 탈퇴하시겠습니까?")) {
      dispatch(withdraw({
        token: sessionStorage.getItem("token")
      }));
    }
  }, [dispatch]);

  const onChange = useCallback(e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.name === 'gender' ? parseInt(e.target.value) : e.target.value
    })
  }, [userInfo]);

  const setUserMajor = useCallback(() => {
    if (userInfo.studentNumber.length > 6) {
      const majorCode = userInfo.studentNumber.substring(4, 7);
      for(let major of majorList) {
        if (major.codes.includes(majorCode)) {
          setUserInfo({
            ...userInfo,
            major: major.name
          })
          break;
        } else {
          if (major.id === 7) {
            setUserInfo({
              ...userInfo,
              major: ""
            })
          } else {
            continue;
          }
        }
      }
    } else {
      setUserInfo({
        ...userInfo,
        major: ""
      })
    }
  }, [userInfo]);

  const checkDuplication = nickname => {
    if (nicknameRegex.test(nickname)) {
      addToast('사용할 수 없는 닉네임입니다.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (!nickname) {
      addToast('닉네임을 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (nickname === parsedUserInfo.nickname) {
      addToast('기존에 등록한 닉네임입니다.', {
        appearance: 'info',
        autoDismiss: true
      });
      return;
    }
    dispatch(checkNickname({nickname}));
  };

  useEffect(() => {
    setUserMajor();
  }, [userInfo.studentNumber])

  useEffect(() => {
    if (data && data.data.success === true) {
      addToast('성공적으로 탈퇴했습니다.', {
        appearance: 'success',
        autoDismiss: true
      });
      return;
    }
    if (data && data.data.success) {
      addToast('사용가능한 닉네임입니다.', {
        appearance: 'success',
        autoDismiss: true
      });
      return;
    }
    if (data && data.status === 201) {
      addToast('성공적으로 회원정보를 수정했습니다.', {
        appearance: 'success',
        autoDismiss: true
      });
      return;
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        addToast('존재하지 않는 계정입니다.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else if (error.status === 422) {
        addToast('형식에 맞지 않는 데이터가 있습니다.', {
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
    if (nicknameCheckError) {
      if (nicknameCheckError.status === 409) {
        addToast('사용 불가능한 닉네임입니다.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else if (nicknameCheckError.status === 412) {
        addToast('올바르지 않은 닉네임 형식입니다.', {
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
  }, [nicknameCheckError]);

  return (
    <Container>
      <ModifyForm
        userInfo={userInfo}
        authInProgress={authInProgress}
        checkInProgress={checkInProgress}
        dropdown={dropdown}
        setDropdown={setDropdown}
        checkDuplication={checkDuplication}
        onModify={onModify}
        onWithdraw={onWithdraw}
        onChange={onChange}
      />
      <CopyRight />
    </Container>
  )
}
