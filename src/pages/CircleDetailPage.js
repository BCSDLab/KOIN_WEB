import React from 'react'
import CircleDetailContainer from '../containers/CircleDetailContainer';

export default function CircleDetailPage({ match }) {
  return (
    <CircleDetailContainer id={match.params.id} />
  )
}
