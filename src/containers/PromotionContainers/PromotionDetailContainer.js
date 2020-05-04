import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotion, checkPromotionPermission, deletePromotion, registerPromotionComment, adjustPromotionComment, deletePromotionComment } from '../../modules/promotion'
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';
import PromotionDetail from '../../components/PromotionComponents/PromotionDetail';
import { useToasts } from 'react-toast-notifications';


export default function PromotionDetailContainer ({
  history,
  match
}) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const {data, error, post, comment} = useSelector(state => state.promotionReducer);
  const [path, setPath] = useState();
  const [isMyPost, setIsMyPost] = useState(false);

  const handleDeleteButton = () => {
    console.log("홍보게시판에서 게시글 삭제버튼 클릭");
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      dispatch(deletePromotion({
        token: sessionStorage.getItem("token"),
        id: match.params.id
      }));
    }
  };
  const handleEditButton = () => {
    console.log("홍보게시판에서 게시글 수정버튼 클릭");
    history.push('/board/promotion/edit');
  };
  const handleRegisterComment = (comment) => {
    console.log("홍보게시판 댓글 추가");
    dispatch(registerPromotionComment({
      token: sessionStorage.getItem("token"),
      postId: match.params.id,
      body: {
        content: comment
      }
    }));
  };
  const handleAdjustComment = (id, comment) => {
    dispatch(adjustPromotionComment({
      token: sessionStorage.getItem("token"),
      postId: match.params.id,
      id,
      body: {
        content: comment
      }
    }))
  };
  const handleDeleteComment = (id) => {
    console.log("홍보게시판 댓글 삭제", id);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(deletePromotionComment({
        token: sessionStorage.getItem("token"),
        postId: match.params.id,
        id
      }));
    }
  };
  const checkDisabled = endDateString => {
    const endDate = new Date(endDateString);
    endDate.setHours(0);
    endDate.setDate(endDate.getDate() + 1);
    return endDate.getTime() <= Date.now()
  }


  useEffect(() => {
    console.log("홍보게시글 진입");
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (match) {
      setPath(match.url);
      sessionStorage.setItem("boardId", 11);
      sessionStorage.setItem("postId", match.params.id)
      dispatch(getPromotion({
        id: match.params.id,
        token: sessionStorage.getItem("token") || undefined
      }));

      // 점주일 때만 퍼미션 체크
      if (userInfo && userInfo.identity === 5 && sessionStorage.getItem("token")) {
        dispatch(checkPromotionPermission({
          token: sessionStorage.getItem("token"),
          id: match.params.id
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      // 게시글 권한 체크 후 내 게시글 판별
      if (data.grantEdit) {
        setIsMyPost(data.grantEdit);
      }
      // 게시글 삭제 성공 시
      if (data.success) {
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
        dispatch(getPromotion({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined
        }));
        addToast("댓글을 등록했습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
      }

      // 삭제 시
      if(comment.delete){
        dispatch(getPromotion({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined
        }));
        addToast("댓글을 삭제했습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
      }

      if(comment.error){
        addToast("권한이 없습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      }
    }
  },[comment]);

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

  useEffect(() => {
    // 게시글 삭제 에러 시
    if (post.error) {
      if (post.error.status === 404) {
        addToast("게시물이 존재하지 않습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
        history.go(-1);
      }
    }
  }, [post.error]);

  return (
    <>
      <Header
        history={history}
        match={match}>
        <ButtonGroup
          history={history}
          match={match}
          isMyPost={isMyPost}
          onClickEditButton={handleEditButton}
          onClickDeleteButton={handleDeleteButton} />
      </Header>
      <PromotionDetail
        history={history}
        match={match}
        promotion={post.data}
        loading={post.loading}
        isMyPost={isMyPost}
        handleDeleteButton={handleDeleteButton}
        registerComment={handleRegisterComment}
        editComment={handleAdjustComment}
        deleteComment={handleDeleteComment}
        checkDisabled={checkDisabled} />
    </>
  )
}
