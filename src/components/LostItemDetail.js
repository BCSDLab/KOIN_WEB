import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Comment from "./SharedComponents/Comment";

const Main = styled.div`
  width: 100%;
  border-top: #f7941e 5px solid;
  
  @media (max-width: 576px) {
    border-top: none;
  }
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

const ItemDetail = styled.div`
  width: 100%;
  float: left;
  margin-right: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 576px) {
    width: inherit;
    margin: 0;
  }
`;

const HeadTitle = styled.div`
  float: left;
  font-size: 30px;
  letter-spacing: -1.5px;
  font-weight: 800;
  color: #175c8e;
  font-family: "NanumSquare", serif;
  margin-bottom: 20px;
  cursor: pointer;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 55px;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const WriteBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: white;
  background-color: #175c8e;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #175c8e;
  margin-top: 1px;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const DeleteBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: #d32525;
  background: white;
  border: 1px #d32525 solid;
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1px;
`;

const ReviseBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: #175c8e;
  background: white;
  border: 1px #175c8e solid;
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1px;
`;

const BorderHead = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #175c8e;
  width: 1132px;
  height: 100%;
  text-align: left;
  user-select: text;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const BoardTitle = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1px;
  color: #252525;
  padding: 26px 20px 7px 20px;
  width: 794px;
  word-wrap: break-word;
`;

const CommentCount = styled.span`
  font-size: 15px;
  letter-spacing: -0.8px;
  color: #175c8e;
`;

const N = styled.img.attrs({
  src: "https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"
})`
  position: relative;
  margin-right: 12px;
  bottom: 1px;
  user-select: none;
  width: 13.5px;
  height: 14px;
  margin-left: 11px;
  top: 0;
`;

const BoardInfo = styled.div`
  display: flex;
  padding-bottom: 27px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Author = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #175c8e;
  margin-right: 16px;
`;

const CreatedAt = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #858585;
  
  span {
    margin-right: 7px;
  }
`;

const MobileBoardHead = styled.div`
  display: none;
  
  @media(max-width: 576px){
  
  }
`;

const ItemInfo = styled.div`
  text-align: left;
  padding: 36px 19px 0 19px;
  
  table tbody tr td:first-child {
    font-size: 15px;
    font-weight: bold;
    line-height: 1.73;
    letter-spacing: -0.8px;
    color: #555555;
    padding-right: 33px;
  }

  table tbody tr td:nth-child(2) {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.73;
    letter-spacing: -0.8px;
    color: #555555;
  }
  
  @media (max-width: 576px) {
    padding: 15px 16px 0 16px;
    
    table tr:first-child {
      display: none;
    }
    
    table tbody tr td:first-child {
      width: 92px;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
    }
    
    table tbody tr td:nth-child(2) {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
    }
  }
`;

const BoardContent = styled.div`
  text-align: left;
  padding-left: 19px;
  padding-right: 19px;
  font-family: NanumBarunGothic, serif;
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.73;
  letter-spacing: -0.8px;
  color: #555555;
  height: 100%;
  min-height: 230px;
  overflow: scroll;
  -ms-overflow-style: none;
  user-select: text;
  padding-top: 15px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media(max-width: 576px){
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: -0.7px;
    min-height: 400px;
    color: #252525;
  }
`;

export default function LostItemDetail(
  {
    history,
    specificData,
    newFlag,
    adjustComment,
    deleteComment,
    registerComment,
    deleteItem,
    reviseItem
  }
) {

  function dateToString(date) {
    return date.slice(0, 10).replace('-', '.').replace('-', '.')
  }

  return (
    <Main>
      <Container>
        <ItemDetail>
          <Header>
            <HeadTitle>
              분실물
            </HeadTitle>
            <Link to={'/lost'}>
              <WriteBtn>
                목록으로
              </WriteBtn>
            </Link>
            {specificData.user_id === (sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("userInfo")).id : "") &&
            <>
              <DeleteBtn onClick={() => deleteItem()}>
                삭제
              </DeleteBtn>
              <ReviseBtn onClick={() => reviseItem()}>
                수정
              </ReviseBtn>
            </>
            }
          </Header>
          <BorderHead>
            <BoardTitle>
              {specificData.title}
              <CommentCount> [{specificData.comment_count}]</CommentCount>
              {newFlag === true &&
              <N/>
              }
            </BoardTitle>
            <BoardInfo>
              <Author>
                {specificData.nickname}
              </Author>
              <CreatedAt>
                <span>{dateToString(String(specificData.created_at))} </span>
                <span>{String(specificData.created_at).slice(10, 19)}</span>
              </CreatedAt>
            </BoardInfo>
          </BorderHead>
          <MobileBoardHead>


          </MobileBoardHead>
          <ItemInfo>
            <table>
              <tbody>
              <tr>
                <td>분류</td>
                <td>{specificData.type === 0 ? '분실물 습득' : '분실물 찾기'}</td>
              </tr>
              <tr>
                <td>{specificData.type === 0 ? '습득일' : '분실일'}</td>
                <td>{specificData.date}</td>
              </tr>
              <tr>
                <td>{specificData.type === 0 ? '습득장소' : '분실장소'}</td>
                <td>{specificData.location}</td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>{specificData.phone}</td>
              </tr>
              </tbody>
            </table>
          </ItemInfo>
          <BoardContent>
            <div dangerouslySetInnerHTML={{__html: specificData.content}}>
            </div>
          </BoardContent>
          <Comment
            history={history}
            specificData={specificData}
            adjustComment={adjustComment}
            registerComment={registerComment}
            deleteComment={deleteComment}
            />
          <Link to={'/lost'}>
            <WriteBtn>
              목록으로
            </WriteBtn>
          </Link>
        </ItemDetail>
      </Container>
    </Main>
  )
}
