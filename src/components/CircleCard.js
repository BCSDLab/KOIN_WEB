import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  margin-bottom: 30px;
  margin-right: ${props => props.index % 3 === 2 ? '0px' : '31px'};
  width: 354px;
  border: solid 1px #d8d8d8;
  height: 280px;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const CircleBackgroundWrapper = styled.div`
  background: #175c8e;
  width: 100%;
  height: 128px;
  overflow: hidden;
`;

const CircleBackgroundImage = styled.img``;

const CircleLogoWrapper = styled.div`
  width: 85px;
  height: 85px;
  background: #d8d8d8;
  position: relative;
  top: -40px;
  border-radius: 42px;
  border: solid 1px #d8d8d8;
  margin: 0 auto;
`;

const CircleLogoImage = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 40px;
  background: white;
`;

const CircleName = styled.div`
  font-size: 20px;
  color: #252525;
  letter-spacing: -1px;
  position: relative;
  bottom: 17px;
`;

const CircleDescription = styled.div`
  letter-spacing: -0.7px;
  font-size: 13px;
  color: #c4c4c4;
  position: relative;
  bottom: 10px;
`;

export default function CircleCard({ circle, index}) {
  return (
    <CardContainer index={index}>
      <Link
        to={`/circle/${circle.id}`}
        style={{
          textDecoration: "none"
        }}
      >
        <CircleBackgroundWrapper>
          {circle.background_img_url && (
            <CircleBackgroundImage src={circle.background_img_url} />
          )}
        </CircleBackgroundWrapper>
        <CircleLogoWrapper>
          {circle.logo_url && <CircleLogoImage src={circle.logo_url} />}
        </CircleLogoWrapper>
        <CircleName>{circle.name}</CircleName>
        <CircleDescription>{circle.line_description}</CircleDescription>
      </Link>
    </CardContainer>
  );
}
