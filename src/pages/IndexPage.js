import React, {useEffect, useState} from 'react'
import styled from "styled-components";

import IndexBusContainer from "../containers/IndexContainers/IndexBusContainer";
import IndexCafeteriaContainer from "../containers/IndexContainers/IndexCafeteriaContainer";
import IndexRecommendContainer from "../containers/IndexContainers/IndexRecommendContainer";
import {h} from "react-naver-maps/dist/hocs-cc75d7f3";

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
  
  @media(max-width: 576px){
    margin-top: 0;
  }
`;

const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media(max-width: 576px){
    display: none;
  }
`;

export default function IndexPage({history}) {
  const [mobileFlag, changeMobileFlag] = useState(false);

  const setMobileFlag = width => {
    if(width < 576) {
      changeMobileFlag(true);
    } else changeMobileFlag(false);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobileFlag(window.innerWidth);
    })
  }, []);

  useEffect(() => {
    setMobileFlag(window.innerWidth);
  },[]);

  return (
    <Container>

      {mobileFlag &&
        <IndexRow>
          <IndexBusContainer history={history}/>
        </IndexRow>
      }

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
