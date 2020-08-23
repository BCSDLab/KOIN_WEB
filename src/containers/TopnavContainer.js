import React, { useState, useEffect, useCallback } from 'react'
import { css } from 'styled-components';
import Topnav from '../components/Topnav';
import * as CATEGORY from '../static/category';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../modules/auth';
import { useToasts } from 'react-toast-notifications';
// import { toggleSheetOpen, updateSheetType } from '../modules/timetable';
import { updateFooterMenu } from '../modules/common';
// import { useDarkenBackground } from '../hooks/useDarkenBackground';

export default function TopnavContainer({ history, path }) {
  const { addToast } = useToasts();
  // const { isShowDarkBackground, configDarkBackground, changeChildComponent, toggleDarkBackground } = useDarkenBackground();
  const categories = CATEGORY.default;
  const [menu, setMenu] = useState("");
  // const [searchWord, setSearchWord] = useState('');
  // const [searchWordList, setSearchWordList] = useState(JSON.parse(localStorage.getItem('search-query')) || []);
  // const [searchBar, setSearchBar] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { token, data, userInfo } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const onMouseOverMenu = useCallback(menu => {
    setMenu(menu);
  }, []);

  const onLogout = useCallback(() => {
    // toggleDarkBackground(false);
    dispatch(logout({
      token: sessionStorage.getItem("token")
    }));
  }, []);

  // const onClickMultiPurposeBtn = useCallback(() => {
  //   if (path === '/timetable') {
  //     dispatch(toggleSheetOpen());
  //     dispatch(updateSheetType({
  //       flag: false,
  //       lecture: {}
  //     }));
  //   } else {
  //     const userInfo = sessionStorage.getItem("userInfo");
  //     if (!userInfo && path !== '/board/anonymous') {
  //       if (window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?")){
  //         history.push('/login');
  //         return;
  //       }
  //     }
  //     else if (userInfo) {
  //       if (!JSON.parse(userInfo).nickname) {
  //         alert("닉네임이 필요합니다.");
  //         history.push('/modifyinfo');
  //         return;
  //       }
  //       if (path === '/board/promotion' && JSON.parse(userInfo).identity !== 5) {
  //         alert("점주만이 홍보게시글을 작성할 수 있습니다.");
  //         return;
  //       }
  //     }
  //     history.push(`${path}/register`);
  //   }
  // }, [path]);

  const onClickFooterMenu = useCallback(idx => {
    dispatch(updateFooterMenu(idx));
  }, []);

  // const onClickSearchButton = useCallback(searchWord => {
  //   // 검색
  //   if (!searchWord || !searchWord.length) {
  //     addToast("검색어를 입력해주세요.", {
  //       appearance: "warning",
  //       autoDismiss: true
  //     });
  //     return;
  //   }
  //   if (localStorage.getItem("search-query")) {
  //     let searchQuery = JSON.parse(localStorage.getItem("search-query"));
  //     if (searchQuery.includes(searchWord)) {
  //       searchQuery.splice(searchQuery.indexOf(searchWord), 1);
  //       searchQuery.unshift(searchWord);
  //     } else {
  //       if (searchQuery.length === 5) {
  //         searchQuery.pop();
  //       }
  //       searchQuery.unshift(searchWord);
  //     }
  //     setSearchWordList(searchQuery);
  //     localStorage.setItem("search-query", JSON.stringify(searchQuery));
  //   } else {
  //     let searchQuery = [searchWord];
  //     setSearchWordList(searchQuery);
  //     localStorage.setItem("search-query", JSON.stringify(searchQuery));
  //   }
  //   history.push(`/search?q=${searchWord}`);
  //   setSearchWord('');
  //   setSearchBar(false);
  // }, []);
  //
  // const onClickDeleteSearchWordBtn = useCallback(searchWord => {
  //   console.log(searchWord);
  //   if (!searchWord) {
  //     localStorage.removeItem('search-query');
  //     setSearchWordList([]);
  //   } else {
  //     let searchQuery = JSON.parse(localStorage.getItem("search-query"));
  //     searchQuery.splice(searchQuery.indexOf(searchWord), 1);
  //     setSearchWordList(searchQuery);
  //     localStorage.setItem("search-query", JSON.stringify(searchQuery));
  //   }
  // }, []);
  //
  // const onChangeSearchWord = useCallback(e => {
  //   setSearchWord(e.target.value);
  // }, []);
  //
  // const onClickLogoImage = useCallback(() => {
  //   setSearchBar(false);
  //   toggleDarkBackground(false);
  // }, []);
  //
  // useEffect(() => {
  //   configDarkBackground({zIndex: 15, backgroundColor: css`rgba(37,37,37,0.5)`, canClickBackground: true});
  //   changeChildComponent(null);
  //   toggleDarkBackground(searchBar);
  // }, [toggleDarkBackground, searchBar]);

  useEffect(() => {
    if (data && data.data.success === 'logout') {
      addToast('성공적으로 로그아웃했습니다.', {
        appearance: 'success',
        autoDismiss: true
      });
    }
  }, [data]);

  // useEffect(() => {
  //   if (!isShowDarkBackground) {
  //     setSearchBar(false);
  //   }
  // }, [isShowDarkBackground]);

  return (
    <>
      <Topnav
        categories={categories}
        menu={menu}
        path={path}
        history={history}
        onMouseOverMenu={onMouseOverMenu}
        token={token}
        userInfo={userInfo}
        onLogout={onLogout}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onClickFooterMenu={onClickFooterMenu}
      />
    </>
  )
}
