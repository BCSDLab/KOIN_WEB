import React, { useState, useEffect } from 'react'
import Topnav from '../components/Topnav';
import * as CATEGORY from '../static/category';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../modules/auth';
import Cookies from 'js-cookie';

export default function TopnavContainer() {
  const categories = CATEGORY.default;
  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState(null);
  const { token, data } = useSelector(state => state.authReducer.user);
  const [dialog, setDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: "alert",
    title: "",
    contents: ""
  })
  const dispatch = useDispatch();

  const onMouseOverMenu = (menu) => {
    setMenu(menu);
    setSubMenu(categories.filter(category => category.title === menu)[0].submenu);
  }

  const onLogout = () => {
    dispatch(logout(sessionStorage.getItem("token")));
  }

  const onConfirm = () => {
    setDialog(false);
  }

  useEffect(() => {
    if (data) {
      if (data.status === 200 && data.statusText === 'OK') {
        setDialog(true);
        setDialogInfo({
          ...dialogInfo,
          contents: "성공적으로 로그아웃했습니다."
        })
      }
    }
  }, [data]);

  return (
    <Topnav
      categories={categories}
      menu={menu}
      subMenu={subMenu}
      onMouseOverMenu={onMouseOverMenu}
      token={token}
      userInfo={data}
      onLogout={onLogout}
      visible={dialog}
      onConfirm={onConfirm}
      dialogInfo={dialogInfo}
    />
  )
}
