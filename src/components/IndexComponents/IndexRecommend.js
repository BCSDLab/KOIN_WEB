import React from "react";
import styled from "styled-components";

const Container = styled.section`
  
  @media(max-width: 576px){
    max-width: 100%;
  }
`;

const Title = styled.h2`
  width: 100%;
  font-family: NanumSquare;
  font-size: 17px;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: #175c8e;
  margin: 0;

  @media(max-width: 576px){
    font-size: 18px;
  }
`;

const RecommendCard = styled.div`
  margin-top: 20px;
  width: 295px;
  height: 157px;
  border: solid 1px #175c8e;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media(max-width: 576px){
    height: 154px;
    max-width: 100%;
    width: 544px;
    padding: 21px 27px;
  }
`;

const StoreName = styled.div`
  font-family: NanumBarunGothic;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: #252525;
  cursor: pointer;
  ovreflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RefreshBtn = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/refresh46%403x.png"
})`
  width: 23px;
  height: 23px;
  object-fit: contain;
  cursor: pointer;
`;

const InfoHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StorePhoneNumber = styled.div`
  display: flex;
`;

const Desc = styled.div`
  font-family: NanumBarunGothic;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-right: 17px;
`;

const Content = styled.div`
  font-family: NanumBarunGothic;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #858585;
`;

const StoreOperating = styled.div`
  display: flex;
  margin-top: 4px;
`;

const Tags = styled.div`
  display: flex;
`;

const Tag = styled.button`
  border: 1px #f7941e solid;
  width: auto;
  height: 20px;
  border-radius: 12px;
  background-color: #f7941e;
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin-right: 5px;
  
  @media(max-width: 576px){
    padding: 0 5px;
  }
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  
  ${Tag}:last-child{
    margin-right: 0;
  }
`;

export default function IndexRecommend(
  {
    history,
    storeData,
    clickRefresh
  }
) {
  return (
    <Container>
      <Title>
        오늘의 추천
      </Title>
      <RecommendCard>
        {storeData &&
        <>
        <div>
          <InfoHead>
            <StoreName onClick={() => history.push(`/store/${storeData.permalink}`)}>
              {storeData.name}
            </StoreName>
            <RefreshBtn onClick={() => clickRefresh()}/>
          </InfoHead>
          <StorePhoneNumber>
            <Desc>
              전화번호
            </Desc>
            <Content>
              {storeData.phone}
            </Content>
          </StorePhoneNumber>
          <StoreOperating>
            <Desc>
              운영시간
            </Desc>
            <Content>
              {storeData.open_time} ~ {storeData.close_time}
            </Content>
          </StoreOperating>
        </div>
        <SubInfo>
          <Tags>
            {storeData.delivery &&
              <Tag>
                #배달가능
              </Tag>
            }
            {storeData.pay_card &&
              <Tag>
                #카드가능
              </Tag>
            }
            {storeData.pay_bank &&
              <Tag>
                #계좌이체가능
              </Tag>
            }
          </Tags>
        </SubInfo>
        </>
        }
      </RecommendCard>
    </Container>
  );
}
