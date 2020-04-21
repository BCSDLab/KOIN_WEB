import React, { useState, useEffect, useCallback } from 'react';
import { useDarkenBackground } from "../../hooks/useDarkenBackground";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { getStoreDetailInfo } from "../../modules/store";
import StoreDetail from "../../components/InfoComponents/StoreDetail";
import StorePoster from "../../components/InfoComponents/StorePoster";
import StoreBanner from "../../components/InfoComponents/StoreBanner";


export default function StoreDetailContainer ({ id }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const { data, loading, error } = useSelector(state => state.storeReducer.store);
  const history = useHistory();
  const { configDarkBackground, changeChildComponent, toggleDarkBackground } = useDarkenBackground();

  const convertEventDDay = useCallback(endDate => {
    const nowTime = Date.now();
    const endTime = new Date(endDate).getTime();
    const DDay = Math.ceil((endTime - nowTime) / (1000 * 3600 * 24));

    return DDay > 7 ?
      '진행중' :
      `마감 D-${DDay}`
  }, []);

  useEffect(() => {
    dispatch(getStoreDetailInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(data && data.image_urls) {
      console.log(data.image_urls)
      setImage(data.image_urls);
    } else if (error) {
      setImage([]);
    }
  }, [data]);

  useEffect(() => {
    sessionStorage.setItem("storeNewFlag", false);

    return () => toggleDarkBackground(false)
  }, []);

  const handleClickImage = useCallback(
    (selectedImage) => {
      configDarkBackground({});
      changeChildComponent(
        <StorePoster
          image={image}
          selectedImage={selectedImage}
          toggleDarkBackground={toggleDarkBackground} />);
      toggleDarkBackground();
    }, [image]
  );

  return (
    <StoreDetail
      store={data}
      selectImage={handleClickImage}
      convertEventDDay={convertEventDDay}
      history={history} >
      {
        data && data.event_articles && data.event_articles.length !== 0 && (
          <StoreBanner
            promotionData={data.event_articles[0]}
            expand={true} />
        )
      }
    </StoreDetail>
  )
}
