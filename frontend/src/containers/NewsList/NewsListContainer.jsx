import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsList from '../../components/newsList/NewsList';

import { listNews } from '../../modules/newsList';
import { useSearchParams } from 'react-router-dom';

const NewsListContainer = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { newsList, error, loading } = useSelector(({ newsList, loading }) => ({
    newsList: newsList.newsList,
    error: newsList.error,
    loading: loading['shortNews/LIST_NEWS'],
  }));
  useEffect(() => {
    const field = searchParams.get('field');
    console.log('field값:', field);
    const username = searchParams.get('username');
    // page가 없으면 1을 기본값으로 사용
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listNews({ field, username, page }));
  }, [dispatch, searchParams]);

  return <NewsList loading={loading} error={error} newsList={newsList} />;
};

export default NewsListContainer;
