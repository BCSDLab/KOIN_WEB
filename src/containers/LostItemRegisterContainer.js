import React, { useState, useEffect, createRef } from "react";
import LostItemRegister from "../components/LostItemRegister";
import {useDispatch} from "react-redux";
import {registerLostItem } from "../modules/lost";
import {boardAPI, marketAPI} from "../api";
import { useToasts } from 'react-toast-notifications';

export default function LostItemRegisterContainer({history}) {
  const { addToast } = useToasts();
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [type, setType] = useState(0);
  const [phoneFlag, setPhoneFlag] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(JSON.parse(sessionStorage.getItem('userInfo')).phone_number);
  const dispatch = useDispatch();
  const editorRef = createRef();

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
    let contents = editorRef.current.state.value;

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

  function imageUpload ()  {

    const _this = this;
    const editor = editorRef.current;
    let formData = new FormData();
    let fileInput = document.createElement('input');
    const range = editor.getEditor().getSelection();
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('style', 'display: none');
    fileInput.setAttribute('accept', 'image/png', 'image/gif', 'image/jpeg', 'image/bmp', 'image/x-icon');

    fileInput.addEventListener('change', async () => {
      formData.append('image', fileInput.files[0]);
      try {
        const result = await marketAPI.uploadImage(sessionStorage.getItem("token"), formData)
        _this.quill.insertEmbed(range.index, 'image', result.data.url[0]);
      } catch(e) {
        addToast("이미지의 크기가 너무 큽니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      }
    });
    fileInput.click();
  }

  const modules = {
    toolbar: {
      container: [
        [{'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'color': []}, {'background':[]}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['image', 'video']
      ]
    }
  }

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
      modules={modules}
      imageUpload={imageUpload}
      />
  )
}
