import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

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

const BoardSubInfo = styled.div`
  border-top: 1px solid #edf0f3;
  border-bottom: 1px solid #edf0f3;
  padding: 19px;
  text-align: left;
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #858585;
`;

const SubInfo = styled.span`
  color: #175c8e;
`;

const Bar = styled.span`
  margin-left: 9px;
  margin-right: 9px;
`;

const BoardComment = styled.div`
  text-align: left;
  height: 100%;
  overflow: scroll;
  margin-bottom: 20px;
  border-bottom: 1px solid #175c8e;
  -ms-overflow-style: none;
  user-select: text;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Comment = styled.div`
  padding-top: 20px;
`;

const CommentInfo = styled.div`
  display: flex;
  margin-bottom: 4px;
  padding-left: 20px;
  padding-right: 20px;
`;

const CommentAuthor = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #175c8e;
  margin-right: 12px;
`;

const CommentCreatedAt = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #858585;
  margin-right: 10px;
`;

const CommentRemoveBtn = styled.img.attrs({
  src: "https://static.koreatech.in/upload/a603ece7567e3b28552fe5193f0453e6.png"
})`
  width: 10px;
  height: 10px;
  position: relative;
  top: 3px;
  cursor: pointer;
`;

const CommentContent = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #252525;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 100%;
  height: 100%;
  word-break: break-all;
  white-space: pre;
  padding-bottom: 9px;
`;

const CommentAdjustInput = styled.div`
  width: 786px;
  padding-left: 20px;
  padding-right: 20px;
  
  textarea {
    height: 29px;
    width: 1057px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 13px;
    padidng-bottom: 10px;
    border: solid 1px #d2dae2;
    resize: none;
    color: #252525;
    font-size: 13px;
    letter-spacing: -0.7px;
  }
`;

const CommentAdjustBtn = styled.button`
  font-family: NanumBarunGothic, serif;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  user-select: none;
  font-size: 11px;
  position: relative;
  left: 5px;
  resize: none;
  color: white;
  background: #175c8e;
  padding: 5px 14px;
  padding-bottom: 4px;
  border: 1px #175c8e solid;
  border-radius: 0;
  cursor: pointer;
`;

const CommentAdjustWhiteBtn = styled.button`
  font-size: 11px;
  margin-left:${props => props.outside ? "20px": "0px"};
  border: 1px #d2dae2 solid;
  padding: 6px 13px;
  padding-top: 3px;
  margin-right: 1px;
  text-align: center;
  color: #858585;
  height: 23px;
  user-select: none;
  margin-top: 4px;
  letter-spacing: -0.6px;
  background-color: #ffffff;
  cursor: pointer;
`;

const CommentWrite = styled.div`
  margin: 0 20px;
  float: left;
  width: 1088px;
  
  @media(max-width: 576px){
    width: calc(100% - 32px);
  }
`;

const WriteBox = styled.div`
  margin-top: 26px;
  margin-bottom: 27px;
  height: 74px;
  width: 1000px;
  float: left;
  border: 1px #bbbbbb solid;
  border-right: none;
  
  @media(max-width: 576px){
    width: calc(100% - 90px);
  }
  
  textarea {
    resize: none;
    font-family: NanumBarunGothic, serif;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.7px;
    padding-right: 10px;
    color: #175c8e;
    width: 691px;
    scroll-snap-margin-bottom: 2000px;
    height: 45px;
    z-index: 13;
    float: left;
    border: none;
    
    @media(max-width: 576px){
      width: 100%;
    }
  }
`;

const Counter = styled.div`
  padding-left: 16px;
  font-size: 13px;
  color: #bebebe;
  width: 691px;
  height: 16px;
  position: relative;
  bottom: -1px;
  margin-bottom: 15px;
  margin-top: 49px;
  z-index: 10;
  user-select: none;
`;

const RegisterBtn = styled.button`
  float: left;
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  border: 1px #bbbbbb solid;
  color: black;
  width: 87px;
  height: 76px;
  cursor: pointer;
  user-select: none;
  background: white;
  margin-top: 26px;
`;

export default function LostItemDetail(
  {
    history,
    specificData,
    newFlag,
    reviseInputFlag,
    setReviseInputFlag,
    adjustComment,
    selectedId,
    setSelectedId,
    deleteComment,
    comment,
    setComment,
    registerComment,
    deleteItem,
    reviseItem
  }
) {
  function changeTime(time) {
    let times = time.split(" ");
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
    let today = new Date()
    let created = changeTime(time);
    if (Math.ceil((today - created) / 1000 / 60) < 60)
      return [Math.ceil((today - created) / 1000 / 60) + "분 전", true];

    if (Math.floor((today - created) / 60 / 1000 / 60) < 4)
      return [Math.floor((today - created) / 60 / 60 / 1000) + "시간 전", true];

    else if (Math.floor((today - created) / 60 / 1000 / 60) < 24)
      return [Math.floor((today - created) / 60 / 1000 / 60) + "시간 전", false];

    else {
      let year = created.getFullYear();
      let month = created.getMonth() + 1 < 10 ? "0" + (created.getMonth() + 1) : created.getMonth() + 1;
      let date = (created.getDate() < 10) ? "0" + created.getDate() : created.getDate();
      let hour = created.getHours() < 10 ? "0" + created.getHours() : created.getHours();
      let minutes = created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes();
      return [String(year) + "." + String(month) + "." + String(date) + " " + String(hour) + ":" + String(minutes), false]
    }
  }

  function dateToString(date) {
    return date.slice(0,10).replace('-','.').replace('-','.')
  }

  function register() {
    registerComment(sessionStorage.getItem("token"));
    document.getElementById("comment").value = "";
  }

  function checkToken(){
    if((sessionStorage.getItem("token")) === null){
      if(window.confirm('로그인해야 작성하실 수 있습니다. 로그인하시겠습니까?')){
        history.push('/login');
      }
    }
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
            {specificData.user_id === (sessionStorage.getItem("token")? JSON.parse(sessionStorage.getItem("userInfo")).id : "") &&
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
                <span>{String(specificData.created_at).slice(10,19)}</span>
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
                <td>{ specificData.type === 0 ? '분실물 습득' : '분실물 찾기' }</td>
              </tr>
              <tr>
                <td>{ specificData.type === 0 ? '습득일' : '분실일' }</td>
                <td>{ specificData.date }</td>
              </tr>
              <tr>
                <td>{ specificData.type === 0 ? '습득장소' : '분실장소' }</td>
                <td>{ specificData.location }</td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>{ specificData.phone }</td>
              </tr>
              </tbody>
            </table>
          </ItemInfo>
          <BoardContent>
            <div dangerouslySetInnerHTML={{__html: specificData.content}}>
            </div>
          </BoardContent>
          <BoardSubInfo>
            댓글 <SubInfo>{ specificData.comment_count }개 </SubInfo>
            <Bar>|</Bar> 조회수 <SubInfo>{ specificData.hit }</SubInfo>
          </BoardSubInfo>
          <BoardComment>
            {specificData.comments.map((comment, idx) => {
              return (
                <Comment>
                  <CommentInfo>
                    <CommentAuthor>{ comment.nickname }</CommentAuthor>
                    <CommentCreatedAt>{computedTime(String(comment.created_at))}</CommentCreatedAt>
                    {computedTime(String(comment.created_at))[1] === true &&
                      <N/>
                    }
                    {comment.grantDelete && true &&
                      <CommentRemoveBtn onClick={() => deleteComment(sessionStorage.getItem('token'), comment.id)}/>
                    }
                  </CommentInfo>
                  {selectedId !== comment.id &&
                    <CommentContent dangerouslySetInnerHTML={{__html: comment.content}}/>
                  }
                  {selectedId === comment.id &&
                    <CommentAdjustInput>
                      <textarea id="target" defaultValue={comment.content}/>
                      <CommentAdjustWhiteBtn onClick={() => setSelectedId(0)}>취소</CommentAdjustWhiteBtn>
                      <CommentAdjustBtn onClick={() => adjustComment(sessionStorage.getItem('token'), comment.id ,document.getElementById("target").value)}>수정</CommentAdjustBtn>
                    </CommentAdjustInput>
                  }
                  {(comment.grantEdit && (selectedId !== comment.id)) &&
                  <CommentAdjustWhiteBtn
                    onClick={() => setSelectedId(comment.id)}
                    outside>
                    수정
                  </CommentAdjustWhiteBtn>
                  }
                </Comment>
              )
            })}
            <CommentWrite>
              <WriteBox>
                <textarea
                  typeof="text"
                  id="comment"
                  onInput={(e) => setComment(e.target.value)}
                  onClick={() => checkToken()}/>
                <Counter>{comment.length}/3000</Counter>
              </WriteBox>
              <RegisterBtn onClick={() => register()}>등록</RegisterBtn>
            </CommentWrite>
          </BoardComment>
        </ItemDetail>
      </Container>
    </Main>
  )
}
