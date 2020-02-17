import React from 'react'
import styled, { css } from 'styled-components';
import Pagination from '../SharedComponents/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import parse from 'html-react-parser';
const Container = styled.div`
  width: 1132px;
  height: 969px;
  margin: 0 auto;
  padding: 69px 0 40px 0;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
    height: auto;
    min-width: 360px;
    min-height: 506px;
    margin: 0;
    padding: 20px 16px 0 16px;
  }
`;

const Title = styled.div`
  font-family: NanumSquareEB;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: normal;
  color: #175c8e;
  text-align: left;
  margin-bottom: 22px;

  @media (max-width: 576px) {
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 0;
  }
`;

const Table = styled.div`
  width: 1132px;
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #175c8e;
  border-collapse: collapse;
  margin-bottom: 22px;

  @media (max-width: 576px) {
    width: 100%;
    border: none;
  }
`;

const TableHead = styled.div`
  height: 49px;
  border-bottom: 1px solid #175c8e;
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
    display: none;
  }
`;

const TableHeadContent = styled.div`
  font-family: NanumBarunGothic;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: #175c8e;
`;

const TableBody = styled.div`
  height: 700px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & div {
    font-family: NanumBarunGothic;
    font-size: 20px;
    line-height: 1.15;
    color: #bbbbbb;
    margin-top: 30px;
  }

`;

const Post = styled.div`
  width: 100%;
  height: 69px;
  font-family: NanumBarunGothic;
  font-size: 13px;
  line-height: 1.15;
  text-align: center;
  color: #252525;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d2dae2;
  &:hover {
    background: #f8fafb;
  }

  @media (max-width: 576px) {
    height: auto;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
  }
`;

const PostTitleStyle = css`
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
`;

const PostInfo = styled.div`
  font-family: NanumBarunGothic;
  font-size: 13px;
  line-height: 1.15;
  text-align: center;
  color: #252525;
  ${props => props.title && PostTitleStyle};
  & div {
    max-width: 550px;
    margin-left: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;



const MobileTableBody = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 576px) {
    display: block;

    & ${Post}:last-child {
      border-bottom: none;
    }
  }
`;

const MobilePostInfo = styled.div`
  width: 100%;
  font-family: NanumBarunGothic;
  font-size: ${props => props.title ? '15px' : '13px'};
  line-height: 1.15;
  text-align: center;
  color: ${props => props.title ? '#252525' : '#9fa9b3'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.title ? 'flex-start' : 'space-between'};
  & + & {
    margin-top: 8px;
  }
  & div {
    max-width: 70%;
    margin-left: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NewTag = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 5px;
`;


export default function SearchResult({
  history,
  query,
  posts,
  totalPageNum,
  loading,
  getSearchResult
}) {
  const styledText = (text) =>  {
    const idx = text.indexOf(query);
    const queryLength = query.length;
    if (text.indexOf(query) !== -1) {
      const styledText = `${text.substring(0, idx)}<strong style="color: #175c8e;">${text.substring(idx, idx + queryLength)}</strong>${text.substring(idx + queryLength, text.length)}`;
      return styledText;
    } else {
      return text;
    }
  };
  const changeTime = time => {
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
  };

  const computedTime = (time) => {
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
        created.getDate() < 10
          ? "0" + created.getDate()
          : created.getDate();
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
  };
  
  return (
    <Container>
      <Title>{`'${query}' 검색 결과입니다.`}</Title>
      <Table>
        <TableHead>
          <TableHeadContent style={{ width: '5%' }}>번호</TableHeadContent>
          <TableHeadContent style={{ width: '10%' }}>분류</TableHeadContent>
          <TableHeadContent style={{ width: '60%' }}>제목</TableHeadContent>
          <TableHeadContent style={{ width: '10%' }}>작성자</TableHeadContent>
          <TableHeadContent style={{ width: '10%' }}>날짜</TableHeadContent>
          <TableHeadContent style={{ width: '5%' }}>조회수</TableHeadContent>
        </TableHead>
        <TableBody>
          {((posts && (!posts.length || !query)) || loading) &&
            <LoaderWrapper>
              <ClipLoader
                size={200}
                color={"#175c8e"}
                loading={loading}
              />
              <img src={"http://static.koreatech.in/assets/img/no-result.png"} alt="no search result" />
              <div>일치하는 결과가 없습니다.</div>
            </LoaderWrapper>
          }
          {posts && posts.map(post =>
            <Post
              key={post.id}
              onClick={() => history.push(post.permalink.split("koreatech.in")[1])}>
              <PostInfo style={{ width: '5%' }}>{post.id}</PostInfo>
              <PostInfo style={{ width: '10%', fontSize: '15px' }}>{post.service_name}</PostInfo>
              <PostInfo title={"true"}>
                {post.permalink.includes('market') && 
                  <strong>
                    [{post.permalink.includes('sell') ? "팝니다" : "삽니다"}]
                  </strong>
                }
                <div>{parse(styledText(post.title))}</div>
                {computedTime(post.created_at)[1] && <NewTag
                  src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"}/>
                }
              </PostInfo>
              <PostInfo style={{ width: '10%', color: '#175c8e' }}>{parse(styledText(post.nickname))}</PostInfo>
              <PostInfo style={{ width: '10%' }}>{computedTime(post.created_at)[0].substring(0, 10)}</PostInfo>
              <PostInfo style={{ width: '5%' }}>{post.hit}</PostInfo>
            </Post>  
          )}
        </TableBody>
        <MobileTableBody>
          {((posts && (!posts.length || !query)) || loading) &&
            <LoaderWrapper>
              <ClipLoader
                size={200}
                color={"#175c8e"}
                loading={loading}
              />
              <img src={"http://static.koreatech.in/assets/img/no-result.png"} alt="no search result" />
              <div>일치하는 결과가 없습니다.</div>
            </LoaderWrapper>
          }
          {posts && posts.map(post =>
            <Post
              key={post.id}
              onClick={() => history.push(post.permalink.split("koreatech.in")[1])}>
              <MobilePostInfo title={"true"}>
                <strong>[{post.service_name}]</strong>
                <div>{parse(styledText(post.title))}</div>
                {computedTime(post.created_at)[1] && <NewTag
                  src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"}/>
                }
              </MobilePostInfo>
              <MobilePostInfo>
                <div>조회 {post.hit} · {post.nickname}</div>
                <div>{computedTime(post.created_at)[0].substring(0, 10)}</div>
              </MobilePostInfo>
            </Post>
          )}
        </MobileTableBody>
      </Table>
      {posts && posts.length !== 0 && <Pagination
        totalPageNum={totalPageNum}
        setPageData={getSearchResult}
        isWriteBtn={false}
        path={'search'}
      />}
    </Container>
  )
}
