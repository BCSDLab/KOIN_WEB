import React, {useEffect, useState} from "react";
import IndexCardNews from "../../components/IndexComponents/IndexCardNews";
import {getCardNews} from "../../api/info";

export default function IndexCardNewsContainer() {
  const [imgLink, setImgLink] = useState("");
  const [newsLink, setNewsLink] = useState("");

  async function getCardNewsData() {
    const result = await getCardNews();
    setImgLink(await result.data.card_news_image);
    setNewsLink(await result.data.card_link_url);
  }

  useEffect(()=> {
    getCardNewsData();
  },[])

  return (
    <IndexCardNews
      imgLink={imgLink}
      newsLink={newsLink}/>
  )
}
