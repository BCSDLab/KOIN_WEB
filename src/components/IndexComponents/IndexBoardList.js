import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 848px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoardName = styled.h2`
  font-family: NanumSquare;
  font-size: 17px;
  font-weight: ${props => props.isSelected ? "600" : "500"};
  line-height: 1.14;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.isSelected ? "#175c8e" : "#bbbbbb"};
  padding: 0 0 5px 0;
  margin: 0 20px 0 0;
  cursor: pointer;
`;

const ShowMore = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  span {
    font-family: NanumBarunGothic;
    font-size: 12px;
    font-weight: normal;
    color: #252525;
    letter-spacing: -0.6px;
    
    ::after {
      display: inline-block;
      width: 12px;
      height: 8px;
      background: url("https://static.koreatech.in/assets/img/bus_dropdown.png") center/12px 8px no-repeat;
      transform: rotate(-90deg);
      content: "";
    }
  }
`;

const Article = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  cursor: pointer;
`;

const ArticleList = styled.div`
  margin-top: 16px;
  
  ${Article}:last-child{
    margin-bottom: 0;
  }
`;

const ArticleTitleContainer = styled.div`
  width: 700px;
  height: 18px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.12;
  text-align: left;
  letter-spacing: normal;
  color: #252525;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Type = styled.span`
  font-weight: bold;
`;

const ArticleTitle = styled.span`
  max-width: 550px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const N = styled.img.attrs({
  src: "https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"
})`
  width: 14px;
  height: 14px;
  margin-left: 10px;
`;

const ArticleDate = styled.div`
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #999999;
`;

export default React.memo(function IndexBoardList({
  history,
  boardList,
  selectedBoard,
  selectBoard,
  articles
}) {
  function clickShowMore(index) {
    switch (index) {
      case 0:
        return history.push('/board/notice');
      case 1:
        return history.push('/board/free');
      case 2:
        return history.push('/board/job');
      case 3:
        return history.push('/board/anonymous');
      case 4:
        return history.push('/board/question');
    }
  }
  function articleType(id) {
    switch(id){
      case 5:
        return "[일반공지]";
      case 6:
        return "[장학공지]";
      case 7:
        return "[학사공지]";
      case 8:
        return "[취업공지]";
      case 9:
        return "[코인공지]";
    }
  }
  function changeTime(time){
    let times = time.split(/[ T]/);
    let date = times[0].split("-");
    let tim = times[1].split(":");
    let created = new Date();
    created.setFullYear(date[0]);
    created.setMonth(date[1] - 1);
    created.setDate(date[2]);
    created.setHours(tim[0]);
    created.setMinutes(tim[1]);
    created.setSeconds(tim[2]);
    return created;
  }
  function computedTime(time) {
    let today = new Date();
    let created = changeTime(time);
    if (
      Math.ceil((today - created) / 1000 / 60) < 60 &&
      Math.ceil((today - created) / 1000 / 60) > 0
    )
      return [Math.floor((today - created) / 1000 / 60) + "분 전", true];

    if (
      Math.floor((today - created) / 60 / 1000 / 60) < 4 &&
      Math.floor((today - created) / 60 / 1000 / 60) > 0
    )
      return [
        Math.floor((today - created) / 60 / 60 / 1000) + "시간 전",
        true
      ];
    else if (
      Math.floor((today - created) / 60 / 1000 / 60) < 24 &&
      Math.floor((today - created) / 60 / 1000 / 60) > 0
    )
      return [
        Math.floor((today - created) / 60 / 1000 / 60) + "시간 전",
        false
      ];
    else {
      let year = created.getFullYear();
      let month =
        created.getMonth() + 1 < 10
          ? "0" + (created.getMonth() + 1)
          : created.getMonth() + 1;
      let date =
        created.getDate() < 10 ? "0" + created.getDate() : created.getDate();
      let hour =
        created.getHours() < 10
          ? "0" + created.getHours()
          : created.getHours();
      let minutes =
        created.getMinutes() < 10
          ? "0" + created.getMinutes()
          : created.getMinutes();

      if (Math.floor((today - created) / 60 / 1000 / 60) < 0) {
        return [
          String(year) +
          "." +
          String(month) +
          "." +
          String(date) +
          " " +
          String(hour) +
          ":" +
          String(minutes),
          true
        ];
      }
      return [
        String(year) +
        "." +
        String(month) +
        "." +
        String(date) +
        " " +
        String(hour) +
        ":" +
        String(minutes),
        false
      ];
    }
  }
  function clickArticle(boardId, id){
    switch(boardId){
      case 1:
        return history.push(`/board/free/${id}`)
      case 2:
        return history.push(`/board/job/${id}`)
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return history.push(`/board/notice/${id}`)
      case undefined:
        return history.push(`/board/anonymous/${id}`)
      case 10:
        return history.push(`/board/question/${id}`)
      default:
        return;
    }
  }
  return (
    <Container>
      <Header>
        <BoardList>
          {boardList.map((board, idx) => {
            return (
              <BoardName
                onClick={() => selectBoard(idx)}
                isSelected={selectedBoard === idx}
                key={idx}>
                {board}
              </BoardName>
            )
          })}
        </BoardList>
        <ShowMore onClick={() => clickShowMore(selectedBoard)}>
          <span>더 보기</span>
        </ShowMore>
      </Header>
      <ArticleList>
        {articles &&
        <>
          {articles.map((article, index) => {
            return (
              <Article key={index}>
                <ArticleTitleContainer onClick={() => clickArticle(article.board_id, article.id)}>
                  <Type>
                    {articleType(article.board_id)}
                  </Type>
                  <ArticleTitle>
                    {article.title}
                  </ArticleTitle>
                  {computedTime(article.created_at)[1] &&
                    <N/>
                  }
                </ArticleTitleContainer>
                <ArticleDate>
                  {computedTime(article.created_at)[0].substring(0, 10)}
                </ArticleDate>
              </Article>
            )
          })}
        </>
        }
      </ArticleList>
    </Container>
  )
})
