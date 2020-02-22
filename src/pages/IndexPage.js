import React from 'react'
import styled from "styled-components";

import IndexBusContainer from "../containers/IndexContainers/IndexBusContainer";
import IndexCafeteriaContainer from "../containers/IndexContainers/indexCafeteriaContainer";
import IndexRecommendContainer from "../containers/IndexContainers/IndexRecommendContainer";

const Container = styled.div`
  width: 1132px;
  margin: 0 auto;
  padding: 40px 0 50px 0;
  
  @media(max-width: 576px){
    padding: 16px 16px 55px 16px;
    width: calc(100% - 32px);
  }
`;

const IndexRow = styled.div`
  margin-top: 40px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const CardList = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function IndexPage({history}) {
  return (
    <Container>
      <IndexRow>
        <CardList>
          <IndexRecommendContainer history={history}/>
          <IndexBusContainer history={history}/>
          <IndexCafeteriaContainer history={history}/>
        </CardList>
      </IndexRow>
    </Container>
  )
}
