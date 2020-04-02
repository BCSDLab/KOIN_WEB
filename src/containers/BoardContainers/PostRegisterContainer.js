import React, { useState, useEffect, useRef } from 'react'
import PostRegister from '../../components/BoardComponents/PostRegister';
import { useDispatch, useSelector } from 'react-redux';
import { registerPost } from '../../modules/board';
import { useToasts } from 'react-toast-notifications';
import { marketAPI, boardAPI } from '../../api'
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';

export default function PostRegisterContainer({ history, match }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.boardReducer);
  const editorRef = useRef();

  const [tempInfo, setTempInfo] = useState({
    nickname: '',
    password: '',
  })

  const [post, setPost] = useState({
    title: '',
    content: ''
  });
  const nickname = sessionStorage.getItem("boardId") !== '-1' && sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")).nickname;
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

  const onChangeTitle = e => {
    setPost({
      ...post,
      title: e.target.value
    })
  }

  const onChangeContent = content => {
    setPost({
      ...post,
      content: content
    })
  }

  const onChangeTempInfo = e => {
    setTempInfo({
      ...tempInfo,
      [e.target.name]: e.target.value
    })
  }

  const onClickRegisterButton = () => {
    const { title, content } = post;
    const boardId = sessionStorage.getItem("boardId");

    if (!title.length || !title) {
      addToast("제목을 입력해주세요.", {
        appearance: "warning",
        autoDismiss: true
      });
      return;
    }
    if (!content.length || !content) {
      addToast("내용을 입력해주세요.", {
        appearance: "warning",
        autoDismiss: true
      });
      return;
    }
    if (boardId !== '-1') {
      dispatch(registerPost({
        body: {
          board_id: boardId,
          title,
          content
        },
        token: sessionStorage.getItem("token"),
        boardId
      }))
    } else {
      const { nickname, password } = tempInfo;
      if (!nickname.length || !nickname) {
        addToast("닉네임을 입력해주세요.", {
          appearance: "warning",
          autoDismiss: true
        });
        return;
      }
      if (nickname.length > 10) {
        addToast("닉네임은 10글자 이하여야 합니다.", {
          appearance: "warning",
          autoDismiss: true
        });
        return;
      }
      if (!password.length || !password) {
        addToast("비밀번호를 입력해주세요.", {
          appearance: "warning",
          autoDismiss: true
        });
        return;
      }
      dispatch(registerPost({
        body: {
          title,
          content,
          nickname,
          password
        },
        token: sessionStorage.getItem("token"),
        boardId
      }));
    }
  }

  const onClickCancelButton = () => {
    history.goBack();
  }

  const computedOnlyDateByDateType = (date) => {
    let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('. ');
  }

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
        const result = sessionStorage.getItem("boardId") !== '-1'
          ? await marketAPI.uploadImage(sessionStorage.getItem("token"), formData)
          : await boardAPI.uploadAnonymousArticleImage(formData);
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
    console.log(data);
    if (data) {
      if (data.status === 201) {
        addToast("게시글이 등록되었습니다", {
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
          match={match}
          history={history}
        />
      </Header>
      <PostRegister
        post={post}
        nickname={nickname || ""}
        editorRef={editorRef}
        modules={modules}
        match={match}
        tempInfo={tempInfo}
        imageUpload={imageUpload}
        onChangeTempInfo={onChangeTempInfo}
        onClickRegisterButton={onClickRegisterButton}
        onClickCancelButton={onClickCancelButton}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        computedOnlyDateByDateType={computedOnlyDateByDateType}>
        <ButtonGroup
          match={match}
          history={history}
        />
      </PostRegister>
    </>
  )
}
