import React, { useState, useEffect, createRef } from "react";
import LostItemRegister from "../components/LostItemRegister";
import {useDispatch} from "react-redux";
import {registerLostItem } from "../modules/lost";

export default function LostItemRegisterContainer({history}) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [type, setType] = useState(0);
  const [phoneFlag, setPhoneFlag] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(JSON.parse(sessionStorage.getItem('userInfo')).phone_number);
  const dispatch = useDispatch();

  const createdAt = today.toISOString().slice(0,10).replace('-','. ').replace('-','. ');

  const clickType = (type) => () => {
    setType(type)
  };

  const phoneFlagChange = (flag) => () => {
    setPhoneFlag(flag)
  };

  const register = () => {
    let registerPlace = place;
    let registerPhoneNumber = phoneNumber;
    let registerDate = date;
    let contents = editorRef.current.getInstance().getHtml();

    if(title === '' || contents === '') {
      alert('제목이나 내용을 추가해주세요.');
      return ;
    }
    if(title.length > 255) {
      alert(`제목 길이는 최대 255자입니다. 지금 제목의 길이는 ${this.length}자 입니다.`);
      return ;
    }

    if(place === '') registerPlace = undefined;
    if(phoneNumber === '') registerPhoneNumber = undefined;
    if(date === '' || date === undefined) registerDate = undefined;

    dispatch(registerLostItem({
      'title': title,
      'type': type,
      'date': registerDate,
      'location': registerPlace,
      'is_phone_open': phoneFlag,
      'phoneNumber': registerPhoneNumber,
      'content': contents,
      'token': sessionStorage.getItem('token')
    })).then(data => {
      console.log(data);
      alert("게시물이 등록되었습니다.");
      history.push('/lost');
    }, error => {
      alert('네트워크를 확인하세요.');
    })
  };

  const editorRef = createRef();

  return (
    <LostItemRegister
      createdAt={createdAt}
      type={type}
      clickType={clickType}
      phoneFlag={phoneFlag}
      phoneFlagChange={phoneFlagChange}
      setTitle={setTitle}
      setDate={setDate}
      setPlace={setPlace}
      editorRef={editorRef}
      history={history}
      register={register}
      setPhoneNumber={setPhoneNumber}
      />
  )
}
