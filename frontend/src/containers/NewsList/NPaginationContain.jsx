import React from 'react';
import NPagination from '../../components/newsList/NPagination';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const NPaginationContainer = () => {
  const [searchParams] = useSearchParams();

  const field = searchParams.get('field');
  //const username = searchParams.get('username');

  // page가 없으면 1을 기본값으로 사용
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const { lastPage, newsList, loading } = useSelector(
    ({ newsList, loading }) => ({
      lastPage: newsList.lastPage,
      newsList: newsList.newsList,
      loading: loading['shortNews/LIST_NEWS'],
    }),
  );

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!newsList || loading) return null;

  return (
    <NPagination
      field={field}
      /*username={username}*/
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default NPaginationContainer;
