import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 295px;
  height: 189px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
`

export default function IndexCardNews(
  {
    imgLink,
    newsLink
  }) {
  return (
    <Container onClick={() => window.open(newsLink)}>
      {imgLink &&
        <Thumbnail src={imgLink}/>
      }
    </Container>
  )
}
