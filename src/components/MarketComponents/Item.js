import React from 'react'
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import Comment from '../SharedComponents/Comment';
import ClipLoader from 'react-spinners/ClipLoader';

const LoaderWrapper = styled.div`
  width: 1132px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Head = styled.div`
  width: 1132px;
  height: 225px;
  border-top: 2px solid #175c8e;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 26px 0;
  @media (max-width: 576px) {
    width: 100%;
    height: auto;
    padding: 0;
    border-top: none;
  }
`;

const LeftForm = styled.div`
  width: 870px;
  text-align: left;
  @media (max-width: 576px) {
    display: none;
  }
`;

const ItemTitleContainer = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  letter-spacing: -1px;
  color: #252525;
  margin-bottom: 7px;
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const ItemTitleContent = styled.span`
  max-width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  @media (max-width: 576px) {
    max-width: 100%;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: left;
  }
  
  @media all and (-ms-high-contrast: none) {
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: normal;
  }
`;

const ItemCommentNum = styled.span`
  font-size: 15px;
  margin-left: 3px;
  letter-spacing: -0.8px;
  color: #175c8e;
`;

const NewTag = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ItemPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  ${props => {
    const { state } = props;
    if (state === 0) {
      return {
        color: '#175c8e'
      }
    } else if (state === 1) {
      return {
        color: '#d32525'
      }
    } else {
      return {
        color: '#aeaeae'
      }
    }
  }};
  @media (max-width: 576px) {
    font-size: 13px;
    font-weight: normal;
    line-height: 1.54;
    letter-spacing: -0.7px;
    text-align: left;
    margin-left: 0;
    margin-top: 4px;
    color: #175c8e;
  }
`;

const ItemState = styled.span`
  font-size: 11px;
  border-radius: 15px;
  padding: 5px 13px;
  ${props => {
    const { state } = props;
    if (state === 0) {
      return {
        color: '#175c8e',
        border: '1px solid #175c8e'
      }
    } else if (state === 1) {
      return {
        color: '#d32525',
        border: '1px solid #d32525'
      }
    } else {
      return {
        color: '#aeaeae',
        border: '1px solid #aeaeae'
      }
    }
  }}
`;

const Guide = styled.div`
  background: #f3f8fb;
  width: 502px;
  height: 34px;
  font-size: 12px;
  letter-spacing: -0.6px;
  text-align: center;
  margin-top: 14px;
  color: #8ca1b0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlretImage = styled.img`
  width: 16px;
  margin-right: 6px;
`;

const Phone = styled.span`
  font-size: 12px;
  margin-left: 11px;
  color: #252525;

  @media (max-width: 576px) {
    display: flex;
    margin-bottom: 19px;
  }
`;

const RightForm = styled.div`
  width: 262px;
  overflow: hidden;
  @media (max-width: 576px) {
    display: none;
  }
`;

const ItemThumbnail = styled.div`
  width: 262px;
  height: 169px;
  background: url(${props => props.thumbnail});
  background-size: cover;
  @media (max-width: 576px) {
    width: 100%;
    height: 214px;
  }
`;

const NoImage = styled.div`
  background: #cacaca;
  line-height: 169px;
  height: 169px;
  width: 262px;
  text-align: center;
  vertical-align: middle;
  color: #999999;
  font-size: 15px;
  @media (max-width: 576px) {
    width: 100%;
    height: 214px;
    background: #a1a1a1;
    color: #d1d1d1;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
`;

const Body = styled.div`
  border-top: 1px solid #175c8e;
  text-align: left;
  height: 100%;
  min-height: 400px;
  margin-bottom: 29px;
  width: 1132px;
  word-break: break-all;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.73;
  letter-spacing: -0.8px;
  color: #555555;
  
  & img {
    max-width: 100%;
  }

  @media (max-width: 576px) {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 16px;
    border-top: none;
    color: #252525;
    
    & img {
      max-width: 100%;
    }
  }
`;

const Title = styled.div`
  letter-spacing: -0.9px;
  text-align: left;
  color: #175c8e;
  font-size: 18px;
  margin-top: 38px;
  font-weight: 800;
  margin-bottom: 24px;
  @media (max-width: 576px) {
    display: none; 
  }
`;

const MobileContainer = styled.div`
  display: none;
  @media (max-width: 576px) {
    width: 100%;
    display: block;
  }
`;

const MobileInfoWrapper = styled.div`
  padding: 15px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #ececec;
`;

const MobileItemInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a1a1a1;
  font-size: 13px;

  & span:first-child {
    max-width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 17px;
`;

const ButtonStyle = css`
  padding: 6.5px 13.5px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  letter-spacing: -0.6px;
  text-align: center;
  background-color: #ffffff;
`;

const EditButton = styled.button`
  ${ButtonStyle}
  border: 1px solid #175c8e;
  color: #175c8e;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  ${ButtonStyle}
  border: 1px solid #ff3030;
  color: #ff3030;
`;

const MobilePhone = styled.div`
  display: none;
  @media (max-width: 576px) {
    font-size: 16px;
    display: flex;
    align-items: center;
    line-height: 1.5;
    letter-spacing: -.8px;
    color: #252525;
  }
`;


export default function Item({
  history,
  item,
  loading,
  isMyItem,
  onClickEditButton,
  onClickDeleteButton,
  registerComment,
  editComment,
  deleteComment
}) {
  const setState = state => {
    const marketId = JSON.parse(sessionStorage.getItem("marketId"));
    if (marketId === 0) {
      if (state === 0) return '판매중';
      else if (state === 1) return '판매중지';
      else return '판매완료';
    } else {
      if (state === 0) return '구매중';
      else if (state === 1) return '구매중지';
      else return '구매완료';
    }
  }
  const convertDate = (time) => {
    const times = time.split(" ");
    const date = times[0].split("-");
    const tim = times[1].split(":");
    let created = new Date();
    created.setFullYear(date[0]);
    created.setMonth(date[1] - 1);
    created.setDate(date[2]);
    created.setHours(tim[0]);
    created.setMinutes(tim[1]);
    created.setSeconds(tim[2]);
    return created;
  }

  const setDate = (time) => {
    const today = new Date();
    let created = convertDate(time);
    if (Math.ceil((today - created) / 1000 / 60) < 60)
      return [Math.floor((today - created) / 1000 / 60) + "분 전", true];
    if (Math.floor((today - created) / 60 / 1000) < 4)
      return [Math.floor((today - created) / 60 / 1000) + "시간 전", true];
    else if (Math.floor((today - created) / 60 / 1000) < 24)
      return [Math.floor((today - created) / 60 / 1000) + "시간 전", false];
    else {
      let year = created.getFullYear();
      let month = created.getMonth() + 1 < 10 ? "0" + (created.getMonth() + 1) : created.getMonth() + 1;
      let date = (created.getDate() < 10) ? "0" + created.getDate() : created.getDate();
      let hour = created.getHours() < 10 ? "0" + created.getHours() : created.getHours();
      let minutes = created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes();
      return [String(year) + "." + String(month) + "." + String(date) + " " + String(hour) + ":" + String(minutes), false]
    }
  }
  return (
    <>
      {loading &&
        <LoaderWrapper>
          <ClipLoader
            color={"#175c8e"}
            size={150}
            loading={loading}
          />
        </LoaderWrapper>
      }
      {item &&
        <>
          <Head>
            <LeftForm>
              <ItemTitleContainer>
                <ItemTitleContent>{item.title}</ItemTitleContent>
                {item.comments.length !== 0 && <ItemCommentNum>[{item.comments.length}]</ItemCommentNum>}
                {setDate(item.created_at)[1] &&
                  <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"}/>
                }
              </ItemTitleContainer>
              <ItemInfo style={{ fontSize: '13px' }}>
                <span style={{ color: "#175c8e" }}>{item.nickname}</span>
                <span style={{ color: "#858585", marginLeft: "16px" }}>{setDate(item.created_at)[0]}</span>
              </ItemInfo>
              <ItemInfo style={{ marginTop: '48px' }}>
                <ItemState state={item.state}>{setState(item.state)}</ItemState>
                <ItemPrice state={item.state}>{item.price ? item.price.toLocaleString() : '- '}원</ItemPrice>
              </ItemInfo>


              <Guide>
                <AlretImage src={"https://static.koreatech.in/upload/6179219f1d42a44c5063d779f20ad3b0.png"} />
                {sessionStorage.getItem("marketId") === '0' ? "판매" : "구매"}
                자의 통화 가능 여부를 고려해 문자로 먼저 문의하는 센스는 필수!
                <Phone>
                  <strong style={{ marginRight: '11px' }}>연락처 </strong>
                  {item.is_phone_open ? item.phone : "비공개"}
                </Phone>
              </Guide>
            </LeftForm>
            <RightForm>
              {item.thumbnail
                ? <ItemThumbnail thumbnail={item.thumbnail}></ItemThumbnail>
                : <NoImage>No Image</NoImage>
              }
            </RightForm>
            <MobileContainer>
              {item.thumbnail
                ? <ItemThumbnail thumbnail={item.thumbnail}></ItemThumbnail>
                : <NoImage>No Image</NoImage>
              }
              <MobileInfoWrapper>
                <ItemTitleContainer>
                  <ItemTitleContent>{item.title}</ItemTitleContent>
                </ItemTitleContainer>
                <MobileItemInfo>
                  <span>조회{item.hit}·{item.nickname}</span>
                  <span>{setDate(item.created_at)[0]}</span>
                </MobileItemInfo>
                <ItemPrice state={item.state}>{item.price ? item.price.toLocaleString() : '- '}원</ItemPrice>
                {isMyItem &&
                  <ButtonGroup>
                    <EditButton onClick={onClickEditButton}>수정</EditButton>
                    <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
                  </ButtonGroup>
                }
              </MobileInfoWrapper>
            </MobileContainer>
          </Head>
          <Body>
            <Title>상품정보</Title>
            <MobilePhone>
              <span style={{ width: '25%' }}>연락처</span>
              <span>{item.is_phone_open ? item.phone : "비공개"}</span>
            </MobilePhone>
            {item && parse(item.content)}
          </Body>
          <Comment
            history={history}
            specificData={item}
            registerComment={registerComment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        </>
      }
    </>
  )
}
