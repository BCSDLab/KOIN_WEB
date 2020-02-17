import React from 'react'
import SearchResultContainer from '../containers/SearchResultContainer';

export default function SearchResultPage({ history, location, match }) {
  return (
    <SearchResultContainer
      history={history}
      location={location}
      match={match}
    />
  )
}
