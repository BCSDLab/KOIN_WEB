import React from 'react'
import RoomDetailContainer from '../../containers/InfoContainers/RoomDetailContainer';

export default function RoomDetailPage({ match }) {
  return (
    <RoomDetailContainer id={match.params.id} />
  )
}
