import React, { useState, useEffect } from 'react'
import Container from '../../components/UserComponents/Container';
import CopyRight from '../../components/UserComponents/CopyRight';
import ModifyForm from '../../components/UserComponents/ModifyForm';
import majorList from '../../static/major';

import { useSelector, useDispatch } from 'react-redux';
import { modifyInfo, checkNickname, withdraw } from '../../modules/auth';

export default function ModifyInfoContainer() {
  const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const passwordRegex = /[`₩~!@#$%<>^&*()\-=+_?<>:;"',.{}|[\]\/\\]/g;
  const nicknameRegex = /admin|관리자/;
  const dispatch = useDispatch();
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
  const [dropdown, setDropdown] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: "alert",
    title: "",
    contents: ""
  })
  const { loading, error, nicknameCheck } = useSelector(state => state.authReducer);

  const onModify = e => {
    e.preventDefault();
    if (userInfo.firstPassword === "" && userInfo.firstPassword === userInfo.secondPassword) {
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        title: "기존 비밀번호가 그대로 사용됩니다."
      });
    } else {
      if (userInfo.firstPassword !== userInfo.secondPassword) {

      }
      if (userInfo.firstPassword.length < 6 || userInfo.firstPassword.length > 18) {
        
      }
      if (!passwordRegex.text(userInfo.firstPassword)) {

      }
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
    if (userInfo.nickname && !nicknameCheck) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    dispatch(modifyInfo(userInfo));
  }

  const onWithdraw = () => {
    setDialog(true);
    setDialogInfo({
      ...dialogInfo,
      type: "confirm",
      contents: "정말 탈퇴하시겠습니까? 탈퇴 후 데이터 복구는 불가능합니다."
    });
  }

  const onConfirm = () => {
    setDialog(false);
    dispatch(withdraw(sessionStorage.getItem("token")));
  }

  const onCancel = () => {
    setDialog(false);
  }

  const onChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
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
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        type: "alert",
        title: "사용할 수 없는 닉네임입니다."
      })
      return;
    }
    if (!nickname) {
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        type: "alert",
        title: "닉네임을 입력해주세요."
      })
      return;
    }
    const status = dispatch(checkNickname(nickname));
    if (status) {
      setDialog(true);
      setDialogInfo({
        ...dialogInfo,
        type: "alert",
        title: "사용 가능한 닉네임입니다."
      })
    }
  }

  const initUserInfo = async () => {
    // if () {
    //   const parsedUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    //   setUserInfo({
    //     ...userInfo,
    //     userId: parsedUserInfo.portal_account,
    //     name: parsedUserInfo.name || "",
    //     nickname: parsedUserInfo.nickname || "",
    //     gender: parsedUserInfo.gender === 0 ? "남" : (parsedUserInfo.gender === 1 ? "여" : ""),
    //     studentNumber: parsedUserInfo.student_number || "",
    //     phoneNumber: parsedUserInfo.phone_number || "",
    //     major: parsedUserInfo.major || ""
    //   })
    // }
  }
  useEffect(() => {
    initUserInfo();
  }, []);

  useEffect(() => {
    setUserMajor();
  }, [userInfo.studentNumber])

  return (
    <Container>
      <ModifyForm
        userInfo={userInfo}
        visible={dialog}
        dialogInfo={dialogInfo}
        loading={loading}
        dropdown={dropdown}
        setDropdown={setDropdown}
        checkDuplication={checkDuplication}
        onModify={onModify}
        onWithdraw={onWithdraw}
        onChange={onChange}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <CopyRight />
    </Container>
  )
}
