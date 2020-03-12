import React from 'react'
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import MarketItemListContainer from '../../containers/MarketContainers/MarketItemListContainer';
import MarketItemContainer from '../../containers/MarketContainers/MarketItemContainer';
import MarketItemRegisterContainer from '../../containers/MarketContainers/MarketItemRegisterContainer';
import MarketItemEditContainer from '../../containers/MarketContainers/MarketItemEditContainer';

const Container = styled.section`
  width: 1132px;
  margin: 64px auto 60px auto;

  @media (max-width: 576px) {
    width: 100%;
    margin: 0 auto;
  }
`;


export default function MarketPage({ history, match }) {
  const { id } = match.params;
  return (
    <Container>
      {!id && <Route exact path={match.path} component={MarketItemListContainer} />}
      {id === 'register' && <Route exact path={match.path} component={MarketItemRegisterContainer} />}
      {id === 'edit' && <Route exact path={match.path} component={MarketItemEditContainer} />}
      {Number.isInteger(parseInt(id)) && <Route path={match.path} component={MarketItemContainer} />}
    </Container>
  )
}
