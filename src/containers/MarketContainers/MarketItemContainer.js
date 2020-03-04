import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/MarketComponents/Header';
import ButtonGroup from '../../components/MarketComponents/ButtonGroup';
import { useToasts } from 'react-toast-notifications';
import Item from '../../components/MarketComponents/Item';
import { getItem, checkPermission, deleteItem, registerComment, editComment, deleteComment } from '../../modules/market';

export default function MarketItemContainer({ history, match }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { item, data, error, comment } = useSelector(state => state.marketReducer);
  const [path, setPath] = useState();
  const [isMyItem, setIsMyItem] = useState(false);

  const onClickEditButton = () => {
    history.push(`/market/${match.params.type}/edit`);
  }

  const onClickDeleteButton = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      dispatch(deleteItem({
        id: match.params.id,
        token: sessionStorage.getItem("token")
      }));
    }
  }

  const onReigsterComment = content => {
    if (!content.length || !content) {
      addToast("내용을 입력해주세요.", {
        appearance: "warning",
        autoDismiss: true
      });
      return;
    }
    dispatch(registerComment({
      token: sessionStorage.getItem("token"),
      itemId: match.params.id,
      body: {
        content
      },
    }));
  }

  const onEditComment = (id, content) => {
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      if (!content.length || !content) {
        addToast("내용을 입력해주세요.", {
          appearance: 'warning',
          autoDismiss: true
        });
        return;
      }
      dispatch(editComment({
        token: sessionStorage.getItem("token"),
        itemId: match.params.id,
        id,
        body: {
          content
        }
      }));
    }
  }

  const onDeleteComment = id => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(deleteComment({
        token: sessionStorage.getItem("token"),
        itemId: match.params.id,
        id,
      }));
    }
  }

  useEffect(() => {
    console.log("게시글 진입");
    if (match) {
      setPath(match.url);
      sessionStorage.setItem("itemId", match.params.id);
      dispatch(getItem({
        id: match.params.id,
        token: sessionStorage.getItem("token") || undefined
      }));

      if (sessionStorage.getItem("token")) {
        dispatch(checkPermission({
          token: sessionStorage.getItem("token"),
          body: {
            item_id: match.params.id
          }
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data.grantEdit) {
        setIsMyItem(true);
      }
      if (data.data.success) {
        addToast("게시글을 삭제했습니다.", {
          appearance: 'success',
          autoDismiss: true
        })
      }
    }
  }, [data]);

  useEffect(()=> {
    if(comment){
      if(comment.data){
        // 댓글 작성 시
        dispatch(getItem({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined,
        }));
        addToast("댓글을 등록했습니다.", {
          appearance: 'success',
          autoDismiss: true
        });
      }

      // 삭제 시
      if(comment.delete){
        dispatch(getItem({
          id: match.params.id,
          token: sessionStorage.getItem("token") || undefined,
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
  },[comment])

  useEffect(() => {
    if (error) {
      if (error.status === 412) {
        addToast("전달한 데이터가 형식에 맞지 않습니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      }
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
          isMyItem={isMyItem}
          onClickEditButton={onClickEditButton}
          onClickDeleteButton={onClickDeleteButton}
        />
      </Header>
      <Item
        history={history}
        item={item.data}
        loading={item.loading}
        isMyItem={isMyItem}
        onClickEditButton={onClickEditButton}
        onClickDeleteButton={onClickDeleteButton}
        registerComment={onReigsterComment}
        editComment={onEditComment}
        deleteComment={onDeleteComment}
      />
    </>
    
  )
}
