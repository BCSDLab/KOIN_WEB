import React from "react";
import styled from "styled-components";
import Pagination from "./SharedComponents/Pagination";

const Main = styled.div`
  width: 100%;
  border-top: #f7941e 5px solid;
`;

const Container = styled.div`
  margin-top: 61px;
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
`;

const List = styled.div`
  width: 100%;
  float: left;
  margin-right: 40px;
  margin-bottom: 20px;
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
`;

const Table = styled.table`
  border-top: 2px #175c8e solid;
  border-bottom: 2px #175c8e solid;
  border-collapse: collapse;
  font-size: 13px;
  letter-spacing: -0.8px;
  table-layout: fixed;
  width:100%;
  
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
  width: 147px;
  color: #175c8e;
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

export default function LostList(
  {
    lostItems,
    totalPageNum,
    setPageData
  }
) {

  return (
    <Main>
      <Container>
        <List>
          <div>
            <HeadTitle>
              분실물
            </HeadTitle>
            <WriteBtn>
              글쓰기
            </WriteBtn>
          </div>
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
            {
              lostItems.map((items) => {
                return(
                  <tr>
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
                      {items.nickname}
                    </Nickname>
                    <LostDate>
                      {items.date}
                    </LostDate>
                    <Date>
                      {items.created_at.slice(0, 10).replace('-','.').replace('-','.')}
                    </Date>
                    <Hit>
                      {items.hit}
                    </Hit>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Pagination
            totalPageNum={totalPageNum}
            setPageData={setPageData}/>
        </List>
      </Container>
    </Main>
  )
}
