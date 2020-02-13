import React, {useState, useEffect} from "react";
import LostItemDetail from "../components/LostItemDetail";
import {useDispatch, useSelector} from "react-redux";
import {getSpecificLostItem, adjustLostComment, deleteLostComment, registerLostComment, deleteLostItem} from "../modules/lost";

export default function LostItemDetailContainer({history}) {
  const {specificData} = useSelector(state => state.lostReducer);
  const dispatch = useDispatch();
  const path = history.location.pathname.split('/')[3];
  const [newFlag, setNewFlag] = useState(false);
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [selectedId, setSelectedId] = useState(0);
  const [comment, setComment] = useState("");

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
      setSelectedId(0);
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
      setSelectedId(0);
    }
  };

  const registerComment = (token) => {
    dispatch(registerLostComment({
      "token": token,
      "itemId": path,
      "content": comment
    })).then(() => {
      alert('댓글이 등록되었습니다.');
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
        alert('삭제되었습니다.');
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
    console.log(specificData);
    checkNewFlag();
  }, [specificData]);

  return (
    <LostItemDetail
      history={history}
      specificData={specificData}
      newFlag={newFlag}
      adjustComment={adjustComment}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      deleteComment={deleteComment}
      comment={comment}
      setComment={setComment}
      registerComment={registerComment}
      deleteItem={deleteItem}
      reviseItem={reviseItem}
      />
  )
}
