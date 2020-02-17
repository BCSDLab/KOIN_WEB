import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { searchPosts } from '../modules/search';
import SearchResult from '../components/SearchComponents/SearchResult';
import { useToasts } from 'react-toast-notifications';

export default function SearchResultContainer({ history, location, match }) {
  const query = queryString.parse(location.search).q;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.searchReducer);

  const getSearchResult = page => {
    dispatch(searchPosts({
      page,
      type: 1,
      searchWord: query
    }))
  }

  useEffect(() => {
    getSearchResult(1);
  }, [query]);

  useEffect(() => {
    if (posts.error) {
      addToast("검색 과젱에서 문제가 발생했습니다.", {
        appearance: 'error',
        autoDismiss: true
      })
      history.goBack();
    }
  }, [posts.error]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <SearchResult
      history={history}
      query={query}
      posts={posts.data || null}
      totalPageNum={posts.totalPageNum || 0}
      loading={posts.loading || null}
      getSearchResult={getSearchResult}
    />
  )
}
