import React from 'react'
import StoreDetailContainer from "../containers/StoreDetailContainter";

export default function StoreDetailPage({ match }) {
  return <StoreDetailContainer id={match.params.id} />
}
