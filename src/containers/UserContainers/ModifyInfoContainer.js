import React, { useState, useEffect } from 'react'
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
  const passwordRegex = /[`₩~!@#$%<>^&*()\-=+_?<>:;"',.{}|[\]\/\\]/g;
  const studentNumberRegex = /^\d{10}$/;
  const nicknameRegex = /admin|관리자/;
  const dispatch = useDispatch();
  const parsedUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
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
    isGraduated: parsedUserInfo.is_graduated
  });

  const [dropdown, setDropdown] = useState(false);
  const { data, isAvailable, authInProgress, checkInProgress, error } = useSelector(state => state.authReducer);

  const onModify = e => {
    e.preventDefault();
    if (userInfo.firstPassword === "" && userInfo.firstPassword === userInfo.secondPassword) {
      addToast('기존 비밀번호가 그대로 사용됩니다.', {
        appearance: 'info',
        autoDismiss: true
      });
    } else {
      if (userInfo.firstPassword !== userInfo.secondPassword) {
        addToast('입력하신 비밀번호가 일치하지 않습니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
      }
      if (userInfo.firstPassword.length < 6 || userInfo.firstPassword.length > 18) {
        addToast('비밀번호는 6자 이상 18자 이하여야 합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
      }
      if (!passwordRegex.text(userInfo.firstPassword)) {
        addToast('비밀번호는 하나 이상의 특수문자가 필요합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
      }
    }
    if (userInfo.phoneNumber && !phoneNumberRegex.test(userInfo.phoneNumber)) {
      addToast('전화번호 양식을 지켜주세요. (Ex: 010-0000-0000)', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (userInfo.studentNumber) {
      if (userInfo.studentNumber.length !== 10 || !studentNumberRegex.test(userInfo.studentNumber)) {
        addToast('학번은 열자리 숫자여야 합니다.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      const year = userInfo.studentNumber.substring(0, 4);
      const majorCode = userInfo.studentNumber.substring(4, 7);
      
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
    if (parsedUserInfo.nickname === userInfo.nickname) {
      
    } else {
      if (userInfo.nickname && !isAvailable) {
        addToast('닉네임 중복확인을 해주세요.', {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
    }
    const payload = {
      // 필수정보
      portal_account: userInfo.userId,
      password: userInfo.firstPassword,
      // 옵션
      name: userInfo.name || undefined,
      nickname: userInfo.nickname || undefined,
      gender: userInfo.gender,
      major: userInfo.major || undefined,
      student_number: userInfo.studentNumber || undefined,
      phone_number: userInfo.phoneNumber || undefined,
      identity: userInfo.identity,
      is_graduated: userInfo.isGraduated
    }
    const token = sessionStorage.getItem("token");
    dispatch(modifyInfo(payload, token));
  }

  const onWithdraw = () => {
    // setDialog(true);
    // setDialogInfo({
    //   ...dialogInfo,
    //   type: "confirm",
    //   contents: "정말 탈퇴하시겠습니까? 탈퇴 후 데이터 복구는 불가능합니다."
    // });
    dispatch(withdraw(sessionStorage.getItem("token")));
  }

  const onChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.name === 'gender' ? parseInt(e.target.value) : e.target.value
    })
  }

  const setUserMajor = () => {
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
  }

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
    if (nickname === JSON.parse(sessionStorage.getItem("userInfo")).nickname) {
      addToast('기존에 등록한 닉네임입니다.', {
        appearance: 'info',
        autoDismiss: true
      });
      return;
    }
    dispatch(checkNickname(nickname));
  }

  useEffect(() => {
    setUserMajor();
  }, [userInfo.studentNumber])

  useEffect(() => {
    console.log(data);
    if (data && data.data.success === 'nickname possible use') {
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
    if (data && data.data.success === true) {
      addToast('성공적으로 탈퇴했습니다.', {
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
