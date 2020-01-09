import React from 'react'
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  width: 173px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  height: 164px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border: 1px #d2dae2 solid;
  cursor: pointer;

  &:hover {
    border: 1px solid #f7941e;
  }

  @media (max-width: 576px) {
    min-width: 158px;
    width: calc(50% - 6px);
    height: 125px;
    box-shadow: none;
  }
`;

const CardHead = styled.div`
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    height: 61px;
  }
`;

const RoomName = styled.span`
  font-family: NanumBarunGothic, serif;
  font-size: 16px;
  font-weight: bold;
  color: #252525;

  @media (max-width: 576px) {
    font-size: 14px;
    font-weight: 400;
  }
`;

const CardBody = styled.div`
  height: 48px;
  background-color: #f9f9f9;
  font-size: 12px;
  font-family: NanumBarunGothic, serif;
  text-align: left;
  padding: 10px 0 10px 14px;
  color: #858585;

  @media (max-width: 576px) {
    height: 48px;
    padding: 8px 0 8px 12px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 4px;
  }
`;

const Badge = css`
  border-radius: 15px;
  width: 50px;
  height: 22px;
  font-family: NanumBarunGothic, serif;
  font-size: 12px;
  line-height: 2;
  text-align: center;
  color: #f3f3f3;
  display: inline-block;
  margin-right: 9px;

  @media (max-width: 576px) {
    width: 40px;
    margin-right: 3px;
  }
`;

const MonthlyBadge = styled.div`
  ${Badge}
  background-color: #4db297;
`;

const CharterBadge = styled.div`
  ${Badge}
  background-color: #f7941e;
`;

export default function RoomCard({ room }) {
  return (
    <CardContainer>
      <Link to={`/room/${room.id}`} style={{ textDecoration: 'none' }}>
        <CardHead>
          <RoomName>{room.name}</RoomName>
        </CardHead>
        <CardBody>
          <InfoWrapper>
            <MonthlyBadge>월세</MonthlyBadge>
            {room.monthly_fee ? room.monthly_fee : "정보없음"}
          </InfoWrapper>
          <InfoWrapper>
            <CharterBadge>전세</CharterBadge>
            {room.charter_fee ? `${room.charter_fee}만원`  : " - "}
          </InfoWrapper>
        </CardBody>
      </Link>
    </CardContainer>
  )
}
