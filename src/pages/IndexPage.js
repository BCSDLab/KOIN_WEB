import React from 'react'
import styled from "styled-components";
import AwesomeSwiper from 'react-awesome-swiper';
import useMobileFlag from "../hooks/useMobileFlag";

import IndexBusContainer from "../containers/IndexContainers/IndexBusContainer";
import IndexCafeteriaContainer from "../containers/IndexContainers/IndexCafeteriaContainer";
import IndexBoardListContainer from "../containers/IndexContainers/IndexBoardListContainer";
import IndexStoreCategoryContainer from "../containers/IndexContainers/IndexStoreCategoryContainer";
import IndexTimeTableContainer from "../containers/IndexContainers/IndexTimeTableContainer";

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
  margin-top: ${props => props.top ? "0" : "40px"};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: ${props => props.mobileTop ? "20px" : "0"};
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

const BoardList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const MobileSwiper = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    margin-top: 45px;
    padding-bottom: 21px!important;
  }
`;

export default function IndexPage({history}) {
  const mobileFlag = useMobileFlag();

  return (
    <Container>
      {mobileFlag &&
        <IndexRow mobileTop>
          <IndexBusContainer history={history}/>
          <IndexStoreCategoryContainer history={history}/>
          <IndexCafeteriaContainer history={history}/>
        </IndexRow>
      }

      <IndexRow top>
        <CardList>
          <div>
            <IndexStoreCategoryContainer history={history}/>
            <IndexBusContainer history={history}/>
          </div>
          <IndexTimeTableContainer/>
        </CardList>
      </IndexRow>



      <IndexRow>
        <CardList>
        <BoardList>
          <IndexBoardListContainer history={history}/>
        </BoardList>
        <IndexCafeteriaContainer history={history}/>
        </CardList>
      </IndexRow>

    </Container>
  )
}
