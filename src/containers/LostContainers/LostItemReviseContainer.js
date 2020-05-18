import React, { useState, useEffect, createRef } from "react";
import LostItemRevise from "../../components/LostComponents/LostItemRevise";
import {useDispatch, useSelector} from "react-redux";
import {marketAPI} from "../../api";
import { useToasts } from 'react-toast-notifications';
import {getSpecificLostItem, reviseLostItem} from "../../modules/lost";

export default function LostItemReviseContainer({history}) {
  const {addToast} = useToasts();
  const editorRef = createRef();
  const dispatch = useDispatch();
  const {specificData, error} = useSelector(state => state.lostReducer);
  const [type, setType] = useState(specificData.type);
  const [phoneFlag, setPhoneFlag] = useState(specificData.is_phone_open);
  const [title, setTitle] = useState(specificData.title);
  const [date, setDate] = useState(specificData.date);
  const [place, setPlace] = useState(specificData.location);
  const userInfo = sessionStorage.getItem("userInfo");
  const [phoneNumber, setPhoneNumber] = useState(userInfo ? JSON.parse(userInfo).phone_number : '');
  const [content, setContent] = useState(specificData.content);
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  const onChangeContent = (content) => {
    setContent(content)
  };

  useEffect(() => {
    console.log(specificData);
    dispatch(getSpecificLostItem({
      id: sessionStorage.getItem('specificId'),
      "token": sessionStorage.getItem('token')
    }));
  },[dispatch]);


  function imageUpload ()  {
    const _this = this;
    const editor = editorRef.current;
    let formData = new FormData();
    let fileInput = document.createElement('input');
    const range = editor.getEditor().getSelection();
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('style', 'display: none');
    fileInput.setAttribute('accept', 'image/*');

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

  const revise = () => {
    let registerPlace = place;
    let registerPhoneNumber = phoneNumber;
    let registerDate = date;

    if(title === '' || !content) {
      addToast('제목이나 내용을 추가해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return ;
    }
    if(title.length > 255) {
      addToast(`제목 길이는 최대 255자입니다. 지금 제목의 길이는 ${title.length}자 입니다.`, {
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

    if (window.confirm("게시글을 수정하시겠습니까?")) {
      dispatch(reviseLostItem({
        'title': title,
        'type': 0,
        'date': registerDate,
        'location': registerPlace,
        'is_phone_open': phoneFlag,
        'phoneNumber': registerPhoneNumber,
        'content': content,
        'token': sessionStorage.getItem('token'),
        'id': specificData.id
      })).then(()=> {
        addToast("게시물이 수정되었습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
        history.push(`/lost/detail/${specificData.id}`);
      }, error => {
        addToast('네트워크를 확인해주세요', {
          appearance: 'error',
          autoDismiss: true
        });
      })
    }
  }
  return (
    <LostItemRevise
      specificData={specificData}
      type={type}
      setType={setType}
      phoneFlag={phoneFlag}
      setPhoneFlag={setPhoneFlag}
      setTitle={setTitle}
      setDate={setDate}
      setPlace={setPlace}
      editorRef={editorRef}
      history={history}
      revise={revise}
      setPhoneNumber={setPhoneNumber}
      modules={modules}
      imageUpload={imageUpload}
      content={content}
      onChangeContent={onChangeContent}/>
  )
}
