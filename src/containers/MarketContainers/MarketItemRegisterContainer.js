import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerItem } from '../../modules/market';
import ItemRegister from '../../components/MarketComponents/ItemRegister';
import Header from '../../components/MarketComponents/Header';
import ButtonGroup from '../../components/MarketComponents/ButtonGroup';
import { marketAPI, boardAPI } from '../../api';
import { useToasts } from 'react-toast-notifications';


export default function MarketItemRegisterContainer({ history, match }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.marketReducer);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef();
  const [item, setItem] = useState({
    title: "",
    price: "",
    phone: "",
    image: "",
    content: ""
  });
  const [isOpen, setIsOpen] = useState(false);
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

  const onChangeItem = async e => {
    if (e.target.name !== 'image') {
      setItem({
        ...item,
        [e.target.name]: e.target.value
      });
    }
    if (e.target.name === 'image' && e.target.files.length) {
      console.log(e.target.files);
      let formData = new FormData();
      formData.append('image', e.target.files[0]);
      try {
        setLoading(true);
        const result = await marketAPI.uploadThumbnailImage(sessionStorage.getItem("token"), formData);
        console.log(result);
        setItem({
          ...item,
          image: result.data.url
        })
      } catch (e) {
        if (e.message === 'Network Error') {
          addToast("이미지의 크기가 너무 큽니다.", {
            appearance: 'error',
            autoDismiss: true
          });
        }
        if (e.message === 'Request failed with status code 500') {
          addToast("네트워크 연결에 문제가 있거나 허용되지 않는 이미지 형식입니다.", {
            appearance: 'error',
            autoDismiss: true
          });
        }
      } finally {
        setLoading(false);
      }
    }
  }

  const onChangeContent = content => {
    setItem({
      ...item,
      content
    });
  }

  const onClickRegisterButton = () => {
    const { title, price, image, content, phone } = item;
    const regExp = /^\d{3}-\d{3,4}-\d{4}$/;

    if (!title.length || !title || !content.length || !content) {
      addToast("제목이나 내용을 입력해주세요.", {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (title.length > 255) {
      addToast(`제목의 최대길이는 255자입니다. 지금 제목의 길이는 ${title.length}자 입니다.`, {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (isOpen && !regExp.test(phone)) {
      addToast(`핸드폰 번호 형식이 잘못되었습니다.`, {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (price < 0) {
      addToast('가격은 음수일 수 없습니다.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    let body = {
      title,
      content,      
      type: sessionStorage.getItem("marketId"),
      is_phone_open: isOpen ? 1 : 0,
      thumbnail: image
    }
    if (price || price.length) body['price'] = price;
    if (isOpen) body['phone'] = phone;
    dispatch(registerItem({
      body,
      token: sessionStorage.getItem("token")
    }));
  }

  const onClickCheckbox = flag => {
    setIsOpen(flag);
    if (flag) {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo.phone_number) {
        addToast("핸드폰 번호를 기입해주세요.", {
          appearance: 'info',
          autoDismiss: true
        });
      } else {
        setItem({
          ...item,
          phone: userInfo.phone_number
        });
      }
    } else {
      setItem({
        ...item,
        phone: ""
      });      
    }
  }

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
        const result = marketAPI.uploadImage(sessionStorage.getItem("token"), formData)
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

  useEffect(() => {
    if (data) {
      if (data.status === 201) {
        addToast("게시글이 등록되었습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      addToast("게시글 등록 중 에러가 발생했습니다.", {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }, [error]);

  return (
    <>
      <Header
        match={match}
        history={history}>
        <ButtonGroup
          history={history}
          match={match}
        />
      </Header>
      <ItemRegister
        history={history}
        item={item}
        isOpen={isOpen}
        editorRef={editorRef}
        modules={modules}
        loading={loading}
        setItem={setItem}
        imageUpload={imageUpload}
        onChangeItem={onChangeItem}
        onChangeContent={onChangeContent}
        onClickCheckbox={onClickCheckbox}
        onClickRegisterButton={onClickRegisterButton}
      />
    </>
    
  )
}
