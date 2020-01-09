import React from 'react'
import RoomDetailContainer from '../containers/RoomDetailContainer';

export default function RoomDetailPage({ match }) {
  return (
    <RoomDetailContainer id={match.params.id} />
  )
}
