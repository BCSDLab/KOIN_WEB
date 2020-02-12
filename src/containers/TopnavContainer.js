import React, { useState, useEffect } from 'react'
import Topnav from '../components/Topnav';
import * as CATEGORY from '../static/category';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../modules/auth';
import { useToasts } from 'react-toast-notifications';
import MobileFooterMenu from '../components/MobileFooterMenu';
import { toggleSheetOpen } from '../modules/timetable';
import { updateFooterMenu } from '../modules/common';

export default function TopnavContainer({ history, path }) {
  const { addToast } = useToasts();
  const categories = CATEGORY.default;
  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { token, data, userInfo } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const onMouseOverMenu = (menu) => {
    setMenu(menu);
    setSubMenu(categories.filter(category => category.title === menu)[0].submenu);
  }

  const onLogout = () => {
    dispatch(logout(sessionStorage.getItem("token")));
  }

  const onClickMultiPurposBtn = () => {
    if (path === '/timetable') {
      dispatch(toggleSheetOpen());
    }
  }

  const onClickFooterMenu = idx => {
    dispatch(updateFooterMenu(idx));
  }

  useEffect(() => {
    if (data && data.data.success === 'logout') {
      addToast('성공적으로 로그아웃했습니다.', {
        appearance: 'success',
        autoDismiss: true
      });
    }
  }, [data]);

  return (
    <>
      <Topnav
        categories={categories}
        menu={menu}
        subMenu={subMenu}
        path={path}
        onMouseOverMenu={onMouseOverMenu}
        token={token}
        userInfo={userInfo}
        onLogout={onLogout}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onClickMultiPurposBtn={onClickMultiPurposBtn}
      />
      <MobileFooterMenu
        history={history}
        path={path}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onClickFooterMenu={onClickFooterMenu}
      />
    </>
  )
}
