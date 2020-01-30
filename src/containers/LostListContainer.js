import React, {useState, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import LostList from "../components/LostList";

export default function LostListContainer() {

  return (
    <LostList/>
  )
}
