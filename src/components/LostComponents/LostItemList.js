import React from "react";
import styled from "styled-components";
import Pagination from "../SharedComponents/Pagination";
import PropTypes from 'prop-types'

const Main = styled.div`
  width: 100%;
`;

const Container = styled.div`
  margin-top: 61px;
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0;
  }
`;

const List = styled.div`
  width: 100%;
  float: left;
  margin-right: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const HeadTitle = styled.h1`
  float: left;
  font-size: 30px;
  letter-spacing: -1.5px;
  font-weight: 800;
  color: #175c8e;
  font-family: "NanumSquare", serif;
  margin: 0 0 20px 0;
  cursor: pointer;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const WriteBtn = styled.button`
  float: right;
  padding: 6px 20px;
  color: white;
  background-color: #175c8e;
  font-size: 13px;
  cursor: pointer;
  letter-spacing: -0.7px;
  border: 1px solid #175c8e;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const Table = styled.table`
  border-top: 2px #175c8e solid;
  border-bottom: 2px #175c8e solid;
  border-collapse: collapse;
  font-size: 13px;
  letter-spacing: -0.8px;
  table-layout: fixed;
  width:100%;
  margin-bottom: 22px;
  
  @media (max-width: 576px) {
    display: none;
  }
  
  thead tr {
    height: 44px;
    font-size: 13px;
  }
  
  thead tr th {
    border-bottom: 1px #175c8e solid;
    font-size: 15px;
    letter-spacing: -0.6px;
    color: #175c8e
  }
  
  thead tr :first-child {
    width: 84px;
  }
  
  thead tr :nth-child(2) {
    width: 84px;
  }
  
  thead tr :nth-child(3) {
    width: 489px;
  }
  
  thead tr :nth-child(4) {
    width: 147px;
  }
  
  thead tr :nth-child(5) {
    width: 140px;
  }
  
  thead tr :nth-child(6) {
    width: 68px;
  }
  
  thead tr :last-child {
    width: 106px;
  }
  
  tbody tr {
    height: 68px;
    cursor: pointer;
    border-bottom: 1px #d2dae2 solid;
    
    @media (max-width: 576px) {
      height: 90px;
      border-bottom: none;
    }
  }
  
  tr:hover td {
    background: #f8fafb;
  }
`;

const Id = styled.td`
  font-size: 13px;
  width: 84px;
`;

const Category = styled.td`
  width: 84px;
`;

const Title = styled.td`
  width: 489px;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const CommentCount = styled.span`
  position: relative;
  bottom: 1px;
  font-size: 12px;
  color: #175c8e;
  letter-spacing: -0.6px;
`;

const Nickname = styled.td`
  span {
    width: 147px;
    color: #175c8e;
    overflow: hidden;
    white-space: pre-line;
    display:-webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    line-height: 15px;
    margin: 21px auto;
  }
  
  @media all and (-ms-high-contrast: none) {
    span {
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const LostDate = styled.td`
  width: 140px;
`;

const Date = styled.td`
  width: 68px;
`;

const Hit = styled.td`
  width: 106px;
`;

const MobileList = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    padding: 16px 16px 14.5px 16px;
    border-bottom: 1px solid #ececec;
  }
`;

const MobileTitle = styled.div`
  display: block;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  letter-spacing: -0.8px;
  line-height: 1.5;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.87);
`;

const MobileCommentCount = styled.span`
  color: #175c8e;
`;

const MobileInfo = styled.div`
  display: block;
  text-align: left;
`;

const MobileMiddleInfo = styled.span`
  font-size: 13px;
  font-weight: normal;
  line-height: 1.54;
  letter-spacing: -0.7px;
  color: #a1a1a1;
  width: 100%;
  display: inline-block;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileDate = styled.span`
  float: right;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.54;
  letter-spacing: -0.7px;
  color: #a1a1a1;
`;

const MobileLostDate = styled.div`
  display: block;
  text-align: left;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.54;
  letter-spacing: -0.7px;
  color: #a1a1a1;
`;

const MobileWrite = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/mobile__create.png"
})`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  @media (max-width: 360px) {
    left: 312px;
  }
`;

const Mobile = styled.div`
  margin-bottom: 22px;
`;

function LostItemList(
  {
    lostItems,
    totalPageNum,
    setPageData,
    history,
    path
  }
) {
  function goRegister() {
    if (sessionStorage.getItem('userInfo')) {
      if(!(JSON.parse(sessionStorage.getItem('userInfo')).nickname)){
        alert("닉네임이 필요합니다.");
        history.push('/modifyinfo');
      }
      else history.push('/lost/register');
    }
    else {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
        history.push('/login');
      }
    }
  }

  return (
    <Main>
      <Container>
        <List>
          <header>
            <HeadTitle>
              분실물
            </HeadTitle>
            <WriteBtn onClick={() => goRegister()}>
              글쓰기
            </WriteBtn>
          </header>
          <Table>
            <thead>
            <tr>
              <th>번호</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성자</th>
              <th>분실 및 습득일</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
            </thead>
            <tbody>
            {lostItems.map((items, id) => {
              return (
                <tr
                  key={id}
                  onClick={() => history.push(`/lost/detail/${items.id}`)}>
                  <Id>
                    {items.id}
                  </Id>
                  <Category>
                    {items.type === 0 &&
                    "분실물 습득"
                    }
                    {items.type === 1 &&
                    "분실물 찾기"
                    }
                  </Category>
                  <Title>
                    {items.title}
                    <CommentCount>
                      {items.comment_count !== 0 &&
                      " [" + items.comment_count + "]"
                      }
                    </CommentCount>
                  </Title>
                  <Nickname>
                    <span>
                      {items.nickname}
                    </span>
                  </Nickname>
                  <LostDate>
                    {items.date}
                  </LostDate>
                  <Date>
                    {items.created_at.slice(0, 10).replace('-', '.').replace('-', '.')}
                  </Date>
                  <Hit>
                    {items.hit}
                  </Hit>
                </tr>
              )
            })}
            </tbody>
          </Table>
          <Mobile>
          {lostItems.map((items, id) => {
            return (
              <MobileList
                key={id}
                onClick={() => history.push(`/lost/detail/${items.id}`)}>
                <MobileTitle>
                  <span>{items.title}</span>
                  <MobileCommentCount>
                    {items.comment_count !== 0 &&
                    " (" + items.comment_count + ")"
                    }
                  </MobileCommentCount>
                </MobileTitle>
                <MobileInfo>
                  <MobileMiddleInfo>조회 {items.hit} · {items.nickname === undefined ? items.author : items.nickname}</MobileMiddleInfo>
                  <MobileDate>{items.created_at.slice(0, 10).replace('-', '.').replace('-', '.')}</MobileDate>
                </MobileInfo>
                <MobileLostDate>{items.type === 0 ? '습득일' : '분실일'}&nbsp;{items.date}</MobileLostDate>
              </MobileList>
            )
          })}
          </Mobile>
          <Pagination
            totalPageNum={totalPageNum}
            setPageData={setPageData}
            isWriteBtn={true}
            path={"lost"}
            writeBtnLink={'/lost/register'}
            history={history}
          />
          <MobileWrite/>
        </List>
      </Container>
    </Main>
  )
}

LostItemList.propTypes = {
  lostItems: PropTypes.array,
  totalPageNum: PropTypes.number,
  setPageData: PropTypes.func,
  history: PropTypes.object,
  path: PropTypes.string
}

export default LostItemList
