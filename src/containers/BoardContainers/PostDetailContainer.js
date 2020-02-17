import React, { useState, useEffect, useCallback } from 'react'
import Post from '../../components/BoardComponents/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, checkPermission, deletePost, registerComment, deleteComment, editComment, clearState } from '../../modules/board';
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';
import { useToasts } from 'react-toast-notifications';

export default function PostDetailContainer({
  match,
  history
}) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { data, error, post, comment } = useSelector(state => state.boardReducer);
  const [isMyPost, setIsMyPost] = useState(false);
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [path, setPath] = useState();
  const [tempInfo, setTempInfo] = useState({
    nickname: '',
    password: ''
  });
  const [buttonFlag, setButtonFlag] = useState(0);
  const onClickDeleteButton = useCallback(() => {
    if (match.params.type !== 'anonymous') {
      console.log("일반게시판에서 삭제버튼 클릭");
      dispatch(deletePost({
        token: sessionStorage.getItem("token"),
        boardId: sessionStorage.getItem("boardId"),
        id: match.params.id,
      }));
    } else {
      console.log("익게에서 삭제버튼 클릭")
      if (!password.length) {
        addToast("비밀번호를 입력해주세요.", {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      setButtonFlag(false);
      dispatch(checkPermission({
        token: sessionStorage.getItem("token"),
        id: match.params.id,
        boardId: sessionStorage.getItem("boardId"),
        tempPassword: password
      }));
    }
  }, [match, dispatch, password]);

  const onClickEditButton = useCallback(() => {
    // 일반 게시판은 바로 수정창으로 이동
    if (match.params.type !== 'anonymous') {
      console.log("일반게시판에서 수정버튼 클릭");
      history.push(`/board/${match.params.type}/edit`);
    } else {
      console.log("익게에서 수정버튼 클릭")
      if (!password.length) {
        addToast("비밀번호를 입력해주세요.", {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      setButtonFlag(true);
      dispatch(checkPermission({
        token: sessionStorage.getItem("token"),
        id: match.params.id,
        boardId: sessionStorage.getItem("boardId"),
        tempPassword: password
      }));
    }
  }, [match, dispatch, password]);

  const onClickDeleteCommentButton = (token, id) => {
    dispatch(deleteComment({
      token,
      postId: match.params.id,
      id
    }));
  }

  const onClickEditCommentButton = (token, id, content) => {
    dispatch(editComment({
      token: sessionStorage.getItem("token"),
      postId: match.params.id,
      id,
      content
    }));
  }

  const onClickRegisterCommentButton = token => {
    dispatch(registerComment({
      token,
      postId: match.params.id,
      content: comment
    }))
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    console.log("게시글 진입");
    if (match) {
      setPath(match.url);
      sessionStorage.setItem("postId", match.params.id)
      dispatch(getPost({
        id: match.params.id,
        token: sessionStorage.getItem("token") || undefined,
        boardId: sessionStorage.getItem("boardId")
      }));

      // 일반 게시판 게시글 권한 체크
      if (sessionStorage.getItem("token") && sessionStorage.getItem("boardId") !== '-1') {
        dispatch(checkPermission({
          token: sessionStorage.getItem("token"),
          id: match.params.id
        }));
      }
    }
  }, []);

  // 게시글에서 게시글 이동
  useEffect(() => {
    if (path) {
      if (path !== match.url) {
        console.log("게시글 -> 다른 게시글");
        setPath(match.url);
        dispatch(getPost({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined,
          boardId: sessionStorage.getItem("boardId")
        }))
      }
    }
  }, [match]);

  useEffect(() => {
    if (data) {
      // 일반 게시글 권한 체크 후 내 게시글 판별 
      if (data.data.grantEdit && sessionStorage.getItem("boardId") !== '-1') {
        setIsMyPost(data.data.grantEdit);
      }
      // 익게 권한 체크, 비밀번호 틀렸을 때
      if (!data.data.grantEdit && sessionStorage.getItem("boardId") === '-1') {
        addToast("권한이 없습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      }
      // 익게 권한 체크, 비밀번호 맞았을 때
      if (data.data.grantEdit && sessionStorage.getItem("boardId") === '-1') {
        sessionStorage.setItem("tempPassword", password);
        console.log(buttonFlag);
        if (buttonFlag) history.push(`/board/${match.params.type}/edit`);
        else {
          dispatch(deletePost({
            token: sessionStorage.getItem("token"),
            boardId: sessionStorage.getItem("boardId"),
            id: match.params.id,
            tempPassword: password
          }));
        }
      }
      // 게시글 삭제 성공 시
      if (data.data.success) {
        addToast("게시글을 삭제했습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
      }
    }
  }, [data]);

  useEffect(()=> {
    if(comment){
      if(comment.data){
        // 댓글 작성 시
        dispatch(getPost({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined,
          boardId: sessionStorage.getItem("boardId")
        }));
        addToast("댓글을 등록했습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
        dispatch(clearState());
      }

      // 삭제 시
      if(comment.delete){
        dispatch(getPost({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined,
          boardId: sessionStorage.getItem("boardId")
        }));
        addToast("댓글을 삭제했습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
        dispatch(clearState());
      }

      if(comment.error){
        addToast("권한이 없습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
        dispatch(clearState());
      }
    }
  },[comment])

  useEffect(() => {
    // 게시글 삭제 에러 시
    if (error) {
      if (error.status === 401) {
        addToast("인증에 실패했습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      } else if (error.status === 412) {
        addToast("전달한 데이터가 형식에 맞지 않습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      } else {
        addToast("게시글 삭제가 실패했습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      }
    }
  }, [error]);

  // 댓글 관련 함수
  const registerArticleComment = (token, comment, anonymousData) => {
    const boardId = sessionStorage.getItem("boardId");

    if(boardId === '-1'){
      dispatch(registerComment({
        "token": token,
        "boardId": boardId,
        "articleId": match.params.id,
        "content": comment,
        "nickname": anonymousData.nickname,
        "password": anonymousData.password,
      }));
    }
    else {
      dispatch(registerComment({
        "token": token,
        "boardId": boardId,
        "articleId": match.params.id,
        "content": comment
      }));
    }
  };

  const deleteArticleComment = (token, id, password) => {
    const boardId = sessionStorage.getItem("boardId");

    if(boardId === '-1'){
      dispatch(deleteComment({
        "token": token,
        "boardId": boardId,
        "articleId": match.params.id,
        "id": id,
        "password": password
      }));
    }
    else {
      dispatch(deleteComment({
        "token": token,
        "boardId": boardId,
        "articleId": match.params.id,
        "id": id,
      }));
    }
  };

  const adjustArticleComment = (token, id, comment, password) => {
    const boardId = sessionStorage.getItem("boardId");

    if(boardId === '-1'){
      dispatch(editComment({
        "token": token,
        "boardId": boardId,
        "articleId": match.params.id,
        "commentId": id,
        "password": password,
        "content": comment
      }));
    }
    else {
      dispatch(editComment({
        "token": token,
        "boardId": boardId,
        "articleId": match.params.id,
        "commentId": id,
        "content": comment
      }));
    }
  }

  return (
    <>
      <Header
        match={match}
        history={history}>
        <ButtonGroup
          match={match}
          history={history}
          isMyPost={isMyPost}
          password={password}
          onChangePassword={onChangePassword}
          onClickEditButton={onClickEditButton}
          onClickDeleteButton={onClickDeleteButton}
        />
      </Header>
      <Post
        post={post.data}
        type={match.params.type}
        history={history}
        loading={post.loading}
        isMyPost={isMyPost}
        password={password}
        onChangePassword={onChangePassword}
        onClickEditButton={onClickEditButton}
        onClickDeleteButton={onClickDeleteButton}
        registerArticleComment={registerArticleComment}
        deleteArticleComment={deleteArticleComment}
        adjustArticleComment={adjustArticleComment}>
        <ButtonGroup
          match={match}
          history={history}
          isMyPost={isMyPost}
          password={password}
          onChangePassword={onChangePassword}
          onClickEditButton={onClickEditButton}
          onClickDeleteButton={onClickDeleteButton}
        />
      </Post>
    </>
  )
}
