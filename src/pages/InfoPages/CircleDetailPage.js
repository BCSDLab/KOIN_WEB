import React from 'react'
import CircleDetailContainer from '../../containers/InfoContainers/CircleDetailContainer';

export default function CircleDetailPage({ match }) {
  return (
    <CircleDetailContainer id={match.params.id} />
  )
}
