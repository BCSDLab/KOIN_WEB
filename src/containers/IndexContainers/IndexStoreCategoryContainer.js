import React from "react";
import IndexStoreCategory from "../../components/IndexComponents/IndexStoreCategory";

export default function IndexStoreCategoryContainer({history}) {

  function selectCategory(tag) {
    sessionStorage.setItem("storeCategory", tag);
    history.push("./store");
  }

  return(
    <IndexStoreCategory selectCategory={selectCategory}/>
  )
}
