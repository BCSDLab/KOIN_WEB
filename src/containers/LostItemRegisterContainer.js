import React, { useState, useEffect } from "react";
import LostItemRegister from "../components/LostItemRegister";

export default function LostItemRegisterContainer() {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [type, setType] = useState(0);
  const [phoneFlag, setPhoneFlag] = useState(0);

  const createdAt = today.toISOString().slice(0,10).replace('-','. ').replace('-','. ');

  const clickType = (type) => () => {
    setType(type)
  };

  const phoneFlagChange = (flag) => () => {
    setPhoneFlag(flag)
  };



  return (
    <LostItemRegister
      createdAt={createdAt}
      type={type}
      clickType={clickType}
      phoneFlag={phoneFlag}
      phoneFlagChange={phoneFlagChange}/>
  )
}
