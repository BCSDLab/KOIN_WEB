import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/MarketComponents/Header';
import ButtonGroup from '../../components/MarketComponents/ButtonGroup';
import { useToasts } from 'react-toast-notifications';
import Item from '../../components/MarketComponents/Item';
import { getItem, checkPermission, deleteItem } from '../../modules/market';

export default function MarketItemContainer({ history, match }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { item, data, error } = useSelector(state => state.marketReducer);
  const [path, setPath] = useState();
  const [isMyItem, setIsMyItem] = useState(false);

  const onClickEditButton = () => {
    history.push(`/market/${match.params.type}/edit`);
  }

  const onClickDeleteButton = () => {
    dispatch(deleteItem({
      id: match.params.id,
      token: sessionStorage.getItem("token")
    }));
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
        match={match}>
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
      />
    </>
    
  )
}
