import React, { useCallback } from 'react'
import styled from 'styled-components';
import * as BOARD_INFO from '../../static/boardInfo';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

const Container = styled.aside`
  float: left;
  width: 258px;

  @media (max-width: 576px) {
    display: none;
  }
`;

const List = styled.div`
  color: #252525;
  padding: 16px 17px 6px;
  border: 1px solid #d2dae2;
  margin-bottom: 16px;
  text-align: left;
`;

const Title = styled.div`
  color: #252525;
  font-size: 15px;
  font-family: NanumSquare, serif;
  font-weight: 700;
  letter-spacing: -0.8px;
  margin-bottom: 19px;
`;

const Post = styled.div`
  font-size: 13px;
  margin-top: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 9px;
`;

const Rank = styled.span`
  color: #175c8e;
  width: 20px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  font-family: Verdana, serif;
  line-height: 0.85;
  letter-spacing: -0.8px;
  font-size: 15px;
  margin-left: -1px;
`;

const PostTitle = styled.span`
  font-family: NanumBarunGothic,serif;
  font-size: 13px;
  color: #252525;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 25px);
  padding-left: 6px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LinkButton = styled.div`
  width: 48.5%;
  cursor: pointer;
`;

const LinkImage = styled.img`
  width: 100%;
`;

function HotPosts({
  hotPosts,
  loading,
  error,
  history
}) {
  const linkList = [
    {
      title: ["코리아텍", "바로가기"],
      url: "https://www.koreatech.ac.kr/kor.do",
      image: "https://static.koreatech.in/assets/img/banner_koreatech.png"
    },
    {
      title: ["아우누리", "바로가기"],
      url: "https://portal.koreatech.ac.kr/login.jsp?sso=ok",
      image: "https://static.koreatech.in/assets/img/banner_awoonori.png"
    },
    {
      title: ["새로운 서비스", "요청하기"],
      url: "https://docs.google.com/forms/d/1VEuxVK9ioVRZN36eb6m0UClyTJwW4lYiKLWcaQw2JzQ/edit",
      image: "https://static.koreatech.in/assets/img/banner_add.png"
    },
    {
      title: ["BCSDLab", "알아보기"],
      url: "http://bcsdlab.com/",
      image: "https://static.koreatech.in/assets/img/banner_bcsd.png"
    },
  ]

  const onClickPost = useCallback((id, boardId) => {
    console.log("가장 많이 본 게시물 클릭");
    if (boardId >= 5 && boardId <= 9) {
      history.push(`/board/notice/${id}`);
    }
    for(let board of BOARD_INFO.default) {
      if (boardId === board.id) {
        console.log(`${board.path}/${id}`)
        history.push(`${board.path}/${id}`);
      }
    }
  }, [history]);

  return (
    <Container>
      <List>
        <Title>가장 많이 본 게시물</Title>
        {hotPosts && hotPosts.map((post, index) =>
          <Post key={index} onClick={() => onClickPost(post.id, post.board_id)}>
            <Rank>{index + 1}</Rank>
            <PostTitle>{post.title}</PostTitle>
          </Post>
        )}
        {(loading || error) &&
          <LoaderWrapper>
            <ClipLoader
              size={80}
              color={"#175c8e"}
              loading={loading}
            />
            {error && "에러가 발생했습니다. 관리자에게 문의해주세요."}
          </LoaderWrapper>
        }
      </List>
      <LinkWrapper>
        {linkList.map((link, index) =>
          <LinkButton key={index}>
            <LinkImage
              onClick={() => window.open(link.url)}
              src={link.image} />
          </LinkButton>
        )}
      </LinkWrapper>
    </Container>
  )
}

HotPosts.propTypes = {
  hotPosts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  history: PropTypes.object
}

export default HotPosts
