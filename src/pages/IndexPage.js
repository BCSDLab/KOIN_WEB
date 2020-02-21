import React from 'react'
import IndexBusContainer from "../containers/IndexContainers/IndexBusContainer";
import styled from "styled-components";

const Container = styled.div`
  width: 1132px;
  margin: 0 auto;
  padding: 40px 0 50px 0;
  
  @media(max-width: 576px){
    padding: 16px 16px 55px 16px;
    width: calc(100% - 32px);
  }
`;

export default function IndexPage({history}) {
  return (
    <Container>
      <IndexBusContainer history={history}/>
    </Container>
  )
}
