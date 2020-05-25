import React, { useState, useEffect, useRef } from 'react'
import PostEdit from '../../components/BoardComponents/PostEdit';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, getPost, checkPermission } from '../../modules/board';
import { useToasts } from 'react-toast-notifications';
import { marketAPI, boardAPI } from '../../api'
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';

export default function PostEditContainer({ history, match }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { data, error, post } = useSelector(state => state.boardReducer);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const editorRef = useRef();
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
    setTitle(e.target.value);
  }

  const onChangeContent = content => {
    setContent(content);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onClickEditButton = () => {
    if (window.confirm("게시글을 수정하시겠습니까?")) {
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
        dispatch(editPost({
          body: {
            title,
            content,
            board_id: boardId
          },
          boardId,
          id: sessionStorage.getItem("postId"),
          token: sessionStorage.getItem("token")
        }))
      } else {
        if (!password.length || !password) {
          addToast("비밀번호를 입력해주세요.", {
            appearance: "warning",
            autoDismiss: true
          })
          return ;
        }
        if (password === sessionStorage.getItem("tempPassword")) {
          dispatch(editPost({
            body: {
              title,
              content,
              password
            },
            id: sessionStorage.getItem("postId"),
            boardId
          }))
        }
      }
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
    if (!sessionStorage.getItem("postId")) {
      alert("선택된 게시글이 없습니다.");
      history.goBack();
    }
    if (sessionStorage.getItem("boardId") === '-1' && !sessionStorage.getItem("tempPassword")) {
      alert("잘못된 접근입니다.");
      history.goBack();
    }

    dispatch(checkPermission({
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("postId"),
      password: sessionStorage.getItem("tempPassword"),
      boardId: sessionStorage.getItem("boardId")
    }))
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data.grantEdit) {
        dispatch(getPost({
          id: sessionStorage.getItem("postId"),
          token: sessionStorage.getItem("token"),
          boardId: sessionStorage.getItem("boardId")
        }))
      }
      if (data.status === 201) {
        addToast("게시글을 수정했습니다", {
          appearance: 'success',
          autoDismiss: true
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (post.data) {
      setTitle(post.data.title);
      setContent(post.data.content);
    }
  }, [post])

  useEffect(() => {
    if (error) {
      addToast("게시글 수정 중 에러가 발생했습니다.", {
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
      <PostEdit
        post={post.data}
        title={title}
        content={content}
        password={password}
        editorRef={editorRef}
        modules={modules}
        match={match}
        imageUpload={imageUpload}
        onChangePassword={onChangePassword}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onClickEditButton={onClickEditButton}
        onClickCancelButton={onClickCancelButton}
        computedOnlyDateByDateType={computedOnlyDateByDateType}>
        <ButtonGroup
          match={match}
          history={history}
        />
      </PostEdit>
    </>
  )
}
