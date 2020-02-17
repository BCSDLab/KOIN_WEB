import React, {useState, useEffect} from "react";
import LostItemDetail from "../components/LostItemDetail";
import {useDispatch, useSelector} from "react-redux";
import {getSpecificLostItem, adjustLostComment, deleteLostComment, registerLostComment, deleteLostItem} from "../modules/lost";
import { useToasts } from 'react-toast-notifications';

export default function LostItemDetailContainer({history}) {
  const {specificData, error} = useSelector(state => state.lostReducer);
  const dispatch = useDispatch();
  const path = history.location.pathname.split('/')[3];
  const [newFlag, setNewFlag] = useState(false);
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [comment, setComment] = useState("");
  const { addToast } = useToasts();

  const checkNewFlag = () => {
    let todayDate = today.toISOString().slice(0,10);
    let createdDate = specificData.created_at.slice(0,10);
    let todayTime = today.toISOString().slice(11,19).split(':');
    let createdTime = specificData.created_at.slice(11,19).split(':');

    if(todayDate === createdDate){
      if(todayTime[0] - createdTime[0] < 4){
        setNewFlag(true)
      }
    }
  };

  const adjustComment = (token, id, body) => {
    if(window.confirm('수정하시겠습니까?')) {
      dispatch(adjustLostComment({
        "token": token,
        "itemId": path,
        "id": id,
        "content": body
      })).then(() => {
        dispatch(getSpecificLostItem({
          id: path,
          "token": token ? sessionStorage.getItem('token') : ""
        }));
      });
    }
  };

  const deleteComment = (token, id) => {
    if(window.confirm('삭제하시겠습니까?')){
      dispatch(deleteLostComment({
        "token": token,
        "itemId": path,
        "id": id
      })).then(() => {
        dispatch(getSpecificLostItem({
          id: path,
          "token": token ? sessionStorage.getItem('token') : ""
        }));
      });
    }
  };

  const registerComment = (token, comment) => {
    dispatch(registerLostComment({
      "token": token,
      "itemId": path,
      "content": comment
    })).then(() => {
      addToast('댓글이 등록되었습니다.',{
        appearance: 'success',
        autoDismiss: true
      });
      dispatch(getSpecificLostItem({
        id: path,
        "token": token ? sessionStorage.getItem('token') : ""
      })).then(() => {
        setComment("");
      });
    });
  };

  const deleteItem = () => {
    if(window.confirm('삭제하시겠습니까?')) {
      dispatch(deleteLostItem({
        "token": sessionStorage.getItem("token"),
        "id": path
      })).then(() => {
        addToast('삭제되었습니다.',{
          appearance: 'success',
          autoDismiss: true
        });
        history.push('/lost');
      })
    }
  };

  const reviseItem = () => {
    if(window.confirm('수정하시겠습니까?')){
      sessionStorage.setItem('revisePath',path);
      history.push('/lost/revise');
    }
  };

  useEffect(() => {
    dispatch(getSpecificLostItem({
      id: path,
      "token": sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ""
    }));
  },[dispatch]);

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
    console.log(specificData);
    checkNewFlag();
  }, [specificData]);

  return (
    <LostItemDetail
      history={history}
      specificData={specificData}
      newFlag={newFlag}
      adjustComment={adjustComment}
      deleteComment={deleteComment}
      registerComment={registerComment}
      deleteItem={deleteItem}
      reviseItem={reviseItem}
      />
  )
}
