import React, { useState, useEffect, useCallback } from 'react';
import useDarkenBackground from "../hooks/useDarkenBackground";
import {useSelector, useDispatch} from 'react-redux';
import { getStoreDetailInfo } from "../modules/store";
import StoreDetail from "../components/StoreDetail";
import StorePoster from "../components/StorePoster";
import StoreBanner from "../components/StoreBanner";
import Cookies from "js-cookie";


export default function StoreDetailContainer ({ id }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const { data, loading, error, image} = useSelector(state => state.storeReducer.store);

  const selectImage = useCallback(
    (selectedImage) => setSelectedImage(selectedImage), []
  )
  const [setShow, DarkBackgroundProvider] = useDarkenBackground(StorePoster, {image, selectedImage, selectImage});

  useEffect(() => {
    dispatch(getStoreDetailInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    Cookies.set("storeNewFlag", false);
  }, []);

  const handleClickImage = useCallback(
    (selectedImage) => {
      setSelectedImage(selectedImage);
      setShow(true);
    }, []
  );

  return (
    <DarkBackgroundProvider>
      <StoreDetail
        store={data}
        selectImage={handleClickImage}>
        {
          data !== null && data.event_articles.length !== 0 && (
            <StoreBanner
              promotionData={data.event_articles[0]}
              expand={true} />
          )
        }
      </StoreDetail>
    </DarkBackgroundProvider>
  )
}