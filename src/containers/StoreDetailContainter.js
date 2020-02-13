import React, { useEffect, useCallback } from 'react';
import useDarkenBackground from "../hooks/useDarkenBackground";
import {useSelector, useDispatch} from 'react-redux';
import { getStoreDetailInfo } from "../modules/store";
import StoreDetail from "../components/StoreDetail";
import Cookies from "js-cookie";


export default function StoreDetailContainer ({ id }) {
  const dispatch = useDispatch();
  const [setShow, DarkBackgroundProvider] = useDarkenBackground(<div>시발</div>);
  const { data, loading, error } = useSelector(state => state.storeReducer.store);

  useEffect(() => {
    (async function () {
      await dispatch(getStoreDetailInfo(id));
    })();
  }, [dispatch, id]);

  useEffect(() => {
    Cookies.set("storeNewFlag", false);
  }, []);

  const selectAnyway = useCallback(
    () => {setShow(state => !state)}, []
  );

  return (
    <DarkBackgroundProvider>
      <StoreDetail
        store={data}
        selectImage={selectAnyway}/>
    </DarkBackgroundProvider>
  )
}