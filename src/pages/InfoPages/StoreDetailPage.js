import React from 'react'
import StoreDetailContainer from "../../containers/InfoContainers/StoreDetailContainter";

export default function StoreDetailPage({ match }) {
  return <StoreDetailContainer id={match.params.id} />
}
