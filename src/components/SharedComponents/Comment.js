import React,{useState} from "react";
import styled from "styled-components";


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
  
  a {
    margin-left: 20px;
  }
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

const CommentLine = styled.div`
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
  width: calc(100% -  72px);
  padding-left: 20px;
  padding-right: 20px;
  
  textarea {
    height: 29px;
    width: 100%;
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
  background: ${props => props.delete ? "#d32525" : "#175c8e"};
  padding: 5px 14px;
  padding-bottom: 4px;
  border: 1px ${props => props.delete ? "#d32525" : "#175c8e"} solid;
  border-radius: 0;
  cursor: pointer;
  margin-left: ${props => props.delete? "5px": ""};
`;

const CommentAnonymousPW = styled.input`
  width: 140px;
  border: 1px #d2dae2 solid;
  color: #858585;
  background-color: #ffffff;
  padding: 2px 14px 4px;
  margin-top: 3px;
  margin-right: 5px;
  
  &::placeholder {
    font-size: 12px;
  }
`;

const CommentAdjustWhiteBtn = styled.button`
  font-size: 11px;
  margin-left:${props => props.outside ? "20px" : "0px"};
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
  width: calc(100% - 32px);
  
  @media(max-width: 576px){
    width: calc(100% - 32px);
  }
`;

const WriteBox = styled.div`
  margin-top: 26px;
  margin-bottom: 27px;
  height: 74px;
  width: calc(100% -  90px);
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
    width: 100%;
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

const AnonymousInput = styled.input`
  position: relative;
  top: 16px;
  padding: 7px 8px;
  font-size: 13px;
  border: 1px #bbbbbb solid;
  width: ${props => props.pw ? "80px": "70px"};
  margin-right: 5px;
`;

export default function Comment(
  {
    history,

    // 게시글 정보
    specificData,

    // dispatch를 발생시키는 댓글 관련 함수들
    adjustComment,
    registerComment,
    deleteComment,

    // 원문 바로가기
    originalLink,

    // 익명게시판
    isAnonymousFlag
  }) {
  const [selectedId,setSelectedId] = useState(0);
  const [comment, setComment] = useState("");

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

  function register() {
    if(sessionStorage.getItem('boardId') === '-1'){
      let anonymousData = {
        "nickname": document.getElementById("nickname").value,
        "password": document.getElementById("password").value
      }
      registerComment(sessionStorage.getItem("token"), comment, anonymousData)
    }
    else {
      registerComment(sessionStorage.getItem("token"), comment);
    }
    document.getElementById("comment").value = "";
  }

  function checkToken() {
    if ((sessionStorage.getItem("token")) === null && sessionStorage.getItem('boardId') !== '-1') {
      if (window.confirm('로그인해야 작성하실 수 있습니다. 로그인하시겠습니까?')) {
        history.push('/login');
      }
    }
  }

  function adjust(id) {
    setSelectedId(0);
    adjustComment(sessionStorage.getItem('token'), id, document.getElementById("target").value);
  }

  return (
    <>
      <BoardSubInfo>
        댓글 <SubInfo>{specificData.comment_count}개 </SubInfo>
        <Bar>|</Bar> 조회수 <SubInfo>{specificData.hit}</SubInfo>
        {originalLink &&
          <a href={originalLink}>원문 바로가기</a>
        }
      </BoardSubInfo>
      <BoardComment>
        {specificData.comments.map((comment, idx) => {
          return (
            <CommentLine key={idx}>
              <CommentInfo>
                <CommentAuthor>{comment.nickname}</CommentAuthor>
                <CommentCreatedAt>{computedTime(String(comment.created_at))}</CommentCreatedAt>
                {computedTime(String(comment.created_at))[1] === true &&
                <N/>
                }
                {comment.grantDelete && true &&
                <CommentRemoveBtn onClick={() => deleteComment(sessionStorage.getItem('token'), comment.id)}/>
                }
              </CommentInfo>

              {/* 수정 미 선택시 */}
              {selectedId !== comment.id &&
              <CommentContent dangerouslySetInnerHTML={{__html: comment.content}}/>
              }

              {/* 수정 중인 댓글*/}
              {selectedId === comment.id &&
              <CommentAdjustInput>
                <textarea id="target" defaultValue={comment.content}/>
                {isAnonymousFlag &&
                  <CommentAnonymousPW
                    placeholder="비밀번호를 입력해주세요"
                    type="password"/>
                }
                <CommentAdjustWhiteBtn onClick={() => setSelectedId(0)}>취소</CommentAdjustWhiteBtn>
                <CommentAdjustBtn
                  onClick={() => adjust(comment.id)}>수정</CommentAdjustBtn>
                {isAnonymousFlag &&
                  <CommentAdjustBtn delete>삭제</CommentAdjustBtn>
                }
              </CommentAdjustInput>
              }
              {((comment.grantEdit && (selectedId !== comment.id)) || (isAnonymousFlag) && (selectedId !== comment.id)) &&
              <CommentAdjustWhiteBtn
                onClick={() => setSelectedId(comment.id)}
                outside>
                수정
              </CommentAdjustWhiteBtn>
              }
            </CommentLine>
          )
        })}
        <CommentWrite>
          {isAnonymousFlag &&
            <>
              <AnonymousInput
                type="text"
                placeholder="댓글 닉네임"
                id="nickname"
                />
              <AnonymousInput
                pw
                type="password"
                placeholder="댓글 비밀번호"
                id="password"
                />
            </>
          }
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
    </>
  )
}
