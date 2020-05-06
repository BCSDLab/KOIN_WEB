import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signUp, checkNickname } from '../../modules/auth'
import SignupForm from '../../components/UserComponents/SignupForm';
import majorList from '../../static/major';
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';
import { useToasts } from 'react-toast-notifications';

export default function SignUpContainer() {
  const { addToast } = useToasts();
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const studentNumberRegex = /^\d{10}$/;
  const passwordRegex = /(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[`₩~!@#$%<>^&*()\-=+_?<>:;"',.{}|[\]\/\\]).+/g;
  const nicknameRegex = /admin|관리자/;
  const dispatch = useDispatch();
  const { data, authInProgress, checkInProgress, isAvailable, error, nicknameCheckError } = useSelector(state => state.authReducer);
  const [dropdown, setDropdown] = useState(false);
  const [terms, setTerms] = useState({
    koin: false,
    privacy: false,
    all: false
  });

  const [userInfo, setUserInfo] = useState({
    userId: "",
    firstPassword: "",
    secondPassword: "",
    name: "",
    nickname: "",
    gender: "",
    studentNumber: "",
    phoneNumber: "",
    major: "",
    identity: 0,
  });

  const onChange = useCallback(e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })

    if (e.target.name === 'gender') {
      setDropdown(false);
    }
  }, [userInfo]);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    const { userId, firstPassword, secondPassword, phoneNumber, nickname,
      name, gender, studentNumber, major, identity } = userInfo;
    if (userId.indexOf("@koreatech.ac.kr") !== -1) {
      addToast('계정명은 @koreatech.ac.kr을 빼고 입력해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    setUserInfo({
      ...userInfo,
      userId: userId.trim()
    });
    if (!firstPassword || !secondPassword || !userId) {
      addToast('필수정보는 반드시 입력해야 합니다.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (!emailLocalPartRegex.test(userId)) {
      addToast('아우누리 계정 형식이 아닙니다.', {
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
    if (firstPassword !== secondPassword) {
      addToast('입력하신 비밀번호가 일치하지 않습니다.', {
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
    if (!(terms.koin && terms.privacy)) {
      addToast('이용 약관에 모두 동의해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
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
    if (nickname && !isAvailable) {
      addToast('닉네임 중복확인을 해주세요.', {
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
      gender: gender || undefined,
      major: major || undefined,
      student_number: studentNumber || undefined,
      phone_number: phoneNumber || undefined,
      identity: identity,
      is_graduated: identity === 4 ? true : false,
    }
    dispatch(signUp(payload));
  }, [userInfo, terms.koin, terms.privacy, isAvailable]);

  const checkTerms = useCallback(e => {
    if (e.target.id === 'all') {
      if (terms.all) {
        setTerms({
          all: false,
          koin: false,
          privacy: false
        })
      } else {
        setTerms({
          all: true,
          koin: true,
          privacy: true
        })
      }
    } else {
      setTerms({
        ...terms,
        [e.target.id]: !terms[e.target.id]
      });
    }
  }, [terms]);

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
    if (nickname.length > 10) {
      addToast('닉네임은 10자리 이하여야 합니다.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    dispatch(checkNickname({nickname}));
  }

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

  useEffect(() => {
    if (data && data.status === 200) {
      addToast('사용가능한 닉네임입니다.', {
        appearance: 'success',
        autoDismiss: true
      });
      return;
    }
    if (data && data.status === 201) {
      addToast('아우누리 이메일로 인증 메일을 발송했습니다. 확인 부탁드립니다.', {
        appearance: 'success',
        autoDismiss: true
      });
      return;
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.status === 409) {
        addToast('이미 가입된 계정입니다.', {
          appearance: 'error',
          autoDismiss: true
        });
      } else if (error.status === 412) {
        addToast('잘못된 학번입니다.', {
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

  useEffect(() => {
    setTerms({
      ...terms,
      all: terms.koin && terms.privacy
    })
  }, [terms.koin, terms.privacy]);

  useEffect(() => {
    setUserMajor();
  }, [userInfo.studentNumber]);

  return (
    <Container>
      <SignupForm
        userInfo={userInfo}
        terms={terms}
        onChange={onChange}
        onSubmit={onSubmit}
        checkDuplication={checkDuplication}
        checkTerms={checkTerms}
        dropdown={dropdown}
        setDropdown={setDropdown}
        authInProgress={authInProgress}
        checkInProgress={checkInProgress}
      />
      <CopyRight style={{ marginBottom: '50px' }}/>
    </Container>

  )
}
