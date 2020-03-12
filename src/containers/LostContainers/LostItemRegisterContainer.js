import React, { useState, useEffect, createRef } from "react";
import LostItemRegister from "../../components/LostComponents/LostItemRegister";
import {useDispatch} from "react-redux";
import {registerLostItem } from "../../modules/lost";
import {marketAPI} from "../../api";
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
  const userInfo = sessionStorage.getItem("userInfo");
  const [phoneNumber, setPhoneNumber] = useState(userInfo ? JSON.parse(userInfo).phone_number : '');
  const dispatch = useDispatch();
  const editorRef = createRef();
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

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

    if(title === '' || !contents) {
      addToast('제목이나 내용을 추가해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return ;
    }
    if(title.length > 255) {
      addToast(`제목 길이는 최대 255자입니다. 지금 제목의 길이는 ${this.length}자 입니다.`, {
        appearance: 'warning',
        autoDismiss: true
      });
      return ;
    }
    if(!dateRegex.test(registerDate)) {
      addToast('날짜 형식을 맞춰주세요. 예시) 2020-01-01', {
        appearance: 'warning',
        autoDismiss: true
      });
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
      addToast('게시글이 등록되었습니다.', {
        appearance: 'success',
        autoDismiss: true
      });
      history.push('/lost');
    }, error => {
      addToast('네트워크를 확인해주세요', {
        appearance: 'error',
        autoDismiss: true
      });
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
