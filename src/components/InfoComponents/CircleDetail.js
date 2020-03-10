import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;

const DetailInfoSection = styled.div`
  width: 1132px;
  min-height: 600px;
  height: 100%;
  margin: 63px auto 50px auto;

  @media (max-width: 576px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  margin: 0;
`;

const ListButton = styled.button`
  width: 73px;
  height: 33px;
  background-color: #175c8e;
  font-size: 12px;
  letter-spacing: -0.6px;
  color: #ffffff;
  border: 1px #175c8e solid;
  cursor: pointer;
`;

const Content = styled.div`
`;

const ContentHeader = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #ececec;
  height: 123px;
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    border-top: none;
    margin: 0 16px;
    height: 110px;
  }
`;

const HeaderNoLogoImage = styled.div`
  width: 58px;
  height: 58px;
  border: 1px #d8d8d8 solid;
  background-color: #d8d8d8;
  border-radius: 30px;

  @media (max-width: 576px) {
    width: 50px;
    height: 50px;
  }
`;

const HeaderLogoImage = styled.img`
  width: 58px;
  height: 58px;
  border: 1px #d8d8d8 solid;
  border-radius: 32px;

  @media (max-width: 576px) {
    width: 50px;
    height: 50px;
  }
`;

const ContentBody = styled.div`
  margin-top: 37px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const BodyNoLogoImage = styled.div`
  font-size: 13px;
  letter-spacing: -0.7px;
  color: #999999;
  line-height: 200px;
  width: 278px;
  height: 200px;
  background: #cacaca;

  @media (max-width: 576px) {
    width: 182px;
    height: 182px;
    border: 1px solid #d8d8d8;
    margin-bottom: 25px;
  }
`;

const BodyLogoImage = styled.img`
  width: 278px;
  height: auto;

  @media (max-width: 576px) {
    width: 182px;
    height: 182px;
    border: 1px solid #d8d8d8;
    margin-bottom: 25px;
  }
`;

const CircleInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;

  @media (max-width: 576px) {
    padding: 0 16px;
    margin: 0;
  }
`;

const CircleName = styled.div`
  letter-spacing: -1px;
  font-size: 20px;
  color: #252525;
`;

const CircleDescription = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: -0.7px;
  color: #c4c4c4;
`;

const CircleInfoTable = styled.table`
  font-size: 13px;
  letter-spacing: -0.7px;

  & td {
    color: #252525;
    text-align: left;
    height: 18px;
  }

  & tr td:nth-child(2) {
    color: #858585;
    padding-left: 14px;
  }

  span {
    cursor: pointer;
  }

  @media (max-width: 576px) {
    & td {
      line-height: 1.15;
      letter-spacing: normal;
    }
  }
`;

const CircleDetailDesc = styled.div`
  margin-top: 43px;
  color: #555555;
  font-size: 15px;
  letter-spacing: -0.8px;
  line-height: 1.75;
  text-align: left;

  @media (max-width: 576px) {
    margin-top: 30px;
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: normal;
  }
`

const LinkButtonList = styled.div`
  margin-top: 35px;
  margin-bottom: 100px;

  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const LinkButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  color: #fff;
  margin-right: 5px;
  @media (max-width: 576px) {
    width: 100%;
    font-size: 14px;
    line-height: 1.15;
    padding: 9px 0;
  }
`;

export default function CircleDetail({ circle, loading, error }) {
  const LinkButtonStyle = type => {
    if (type === "facebook") {
      return {
        background: "#175c8e",
        border: "1px #175c8e solid"
      };
    } else if (type === "naver") {
      return {
        background: "#00c73c",
        border: "1px #00c73c solid"
      };
    } else {
      return {
        background: "#e85521",
        border: "1px #e85521 solid"
      };
    }
  };

  const setInfo = info => {
    if (info) return info;
    else return "정보없음";
  };
  return (
    <Container>
      {circle && (
        <DetailInfoSection>
          <Header>
            <Title>동아리 안내</Title>
            <Link to="/circle">
              <ListButton>목록으로</ListButton>
            </Link>
          </Header>
          <Content>
            <ContentHeader>
              {circle.logo_url ? (
                <HeaderLogoImage src={circle.logo_url} />
              ) : (
                <HeaderNoLogoImage />
              )}
              <CircleInfoWrapper>
                <CircleName>{circle.name}</CircleName>
                <CircleDescription>{circle.line_description}</CircleDescription>
              </CircleInfoWrapper>
            </ContentHeader>
            <ContentBody>
              {circle.logo_url ? (
                <BodyLogoImage src={circle.logo_url} />
              ) : (
                <BodyNoLogoImage>no image</BodyNoLogoImage>
              )}
              <CircleInfoWrapper>
                <CircleInfoTable>
                  <tbody>
                    <tr>
                      <td>동아리방</td>
                      <td>{setInfo(circle.location)}</td>
                    </tr>
                    <tr>
                      <td>주요활동</td>
                      <td>{setInfo(circle.major_business)}</td>
                    </tr>
                    <tr>
                      <td>지도교수</td>
                      <td>{setInfo(circle.professor)}</td>
                    </tr>
                    <tr>
                      <td>홈페이지</td>
                      <td>
                        {circle.introduce_url ? (
                          <span onClick={() => window.open(circle.introduce_url)}>
                            {circle.introduce_url}
                          </span>
                        ) : "정보없음"}
                      </td>
                    </tr>
                  </tbody>
                </CircleInfoTable>
                <CircleDetailDesc>
                  {circle.description
                    && circle.description.split('\n').map((line, index) => 
                    <span key={index}>{line}<br /></span>
                  )}
                </CircleDetailDesc>
                <LinkButtonList>
                  {circle.link_urls &&
                    circle.link_urls.map((link, index) => (
                      link.link && <LinkButton
                        key={index}
                        onClick={() => window.open(link.link)}
                        style={LinkButtonStyle(link.type)}
                      >
                        {link.type === "facebook"
                          ? "페이스북"
                          : link.type === "naver"
                          ? "네이버"
                          : "싸이월드"}
                        바로가기
                      </LinkButton>
                    ))}
                </LinkButtonList>
              </CircleInfoWrapper>
            </ContentBody>
          </Content>
        </DetailInfoSection>
      )}
    </Container>
  );
}
