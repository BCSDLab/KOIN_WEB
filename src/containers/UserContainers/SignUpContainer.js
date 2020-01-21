import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signUp, checkNickname } from '../../modules/auth'
import SignupForm from '../../components/UserComponents/SignupForm';
import majorList from '../../static/major';
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';

export default function SignUpContainer() {
  const emailLocalPartRegex = /^[a-z_0-9]{1,12}$/;
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const passwordRegex = /[`₩~!@#$%<>^&*()\-=+_?<>:;"',.{}|[\]\/\\]/g;
  const nicknameRegex = /admin|관리자/;
  const dispatch = useDispatch();
  const { data, nicknameCheck, loading, error } = useSelector(state => state.authReducer.user);
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
  });

  const onChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })

    if (e.target.name === 'gender') {
      setDropdown(false);
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    if (userInfo.userId.indexOf("@koreatech.ac.kr") !== -1) {
      alert("@koreatech.ac.kr을 빼고 입력해주세요.");
      return;
    }
    setUserInfo({
      ...userInfo,
      userId: userInfo.userId.trim()
    });
    if (!emailLocalPartRegex.test(userInfo.userId)) {
      alert("아우누리 계정 형식이 아닙니다.");
      return;
    }
    if (!userInfo.firstPassword || !userInfo.secondPassword || !userInfo.userId ) {
      alert("필수정보는 반드시 입력해야 합니다.");
      return;
    }
    if (userInfo.firstPassword.length < 6 || userInfo.firstPassword > 18) {
      alert("비밀번호는 6자 이상 18자 이하여야 합니다.");
      return;
    }
    if (userInfo.firstPassword !== userInfo.secondPassword) {
      alert("입력하신 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!passwordRegex.test(userInfo.firstPassword)) {
      alert("비밀번호는 하나 이상의 특수문자가 필요합니다.");
      return;
    }
    if (!(terms.koin && terms.privacy)) {
      alert("이용 약관에 모두 동의해주세요.");
      return;
    }
    if (phoneNumberRegex.test(userInfo.phoneNumber)) {
      alert("전화번호 양식을 지켜주세요. (Ex: 010-0000-0000)");
      return;
    }
    if (userInfo.studentNumber) {
      if (userInfo.studentNumber.length !== 10) {
        alert("학번은 열자리 숫자여야 합니다.");
        return;
      }
      const year = userInfo.studentNumber.substring(0, 4);
      const majorCode = userInfo.studentNumber.substring(4, 7);
      
      if (year < 1992 || year > new Date().getFullYear()) {
        alert("올바른 입학년도가 아닙니다.");
        return;
      }
      for(let major of majorList) {
        if (major.codes.includes(majorCode)) {
          break;
        } else {
          if (major.id === 7) {
            alert("올바른 학부코드가 아닙니다.");
            return;
          } else {
            continue;
          }
        }
      }
    }
    console.log(!userInfo.nickname);
    if (userInfo.nickname && !nicknameCheck) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    dispatch(signUp(userInfo));
  }

  const checkTerms = e => {
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
  }

  const checkDuplication = nickname => {
    if (nicknameRegex.test(nickname)) {
      alert("사용할 수 없는 닉네임입니다.");
      return;
    }
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    dispatch(checkNickname(nickname));
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

  useEffect(() => {
    console.log("gg");
    setTerms({
      ...terms,
      all: terms.koin && terms.privacy
    })
    setUserMajor();
  }, [terms.koin, terms.privacy, userInfo.studentNumber]);

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
        loading={loading}
      />
      <CopyRight style={{ marginBottom: '50px' }}/>
    </Container>
    
  )
}
