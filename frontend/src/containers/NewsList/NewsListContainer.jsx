import React from 'react';
import NPagination from '../../components/newsList/NPagination';
//import { listNews } from '../../modules/listNews';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewsListContainer = () => {
  const [searchParams] = useSearchParams();

  const shortNewsField = searchParams.get('shortNewsField');
  // page가 없으면 1을 기본값으로 사용
  const page = parseInt(searchParams.get('page'), 9) || 1;

  const { lastPage, shortNews, loading } = useSelector(
    ({ shortNews, loading }) => ({
      lastPage: shortNews.lastPage,
      shortNews: shortNews.shortNews,
      loading: loading['shortNews/LIST_NEWS'],
    }),
  );

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!shortNews || loading) return null;

  return (
    <NPagination
      shortNewsField={shortNewsField}
      page={parseInt(page, 9)}
      lastPage={lastPage}
    />
  );
};

export default NewsListContainer;
