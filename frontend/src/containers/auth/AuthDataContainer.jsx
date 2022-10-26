import React, { useEffect } from 'react';
import AuthDataViewer from '../../components/auth/AuthDataViewer';

import { listSaveNews } from '../../modules/saveNewsList';
import { useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const AuthDataContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  //
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { saveNewsList, error, loading } = useSelector(
    ({ saveNewsList, loading }) => ({
      saveNewsList: saveNewsList.saveNewsList,
      error: saveNewsList.error,
      loading: loading['shortNews/LIST_SAVE_NEWS'],
    }),
  );
  useEffect(() => {
    const username = searchParams.get('id');
    console.log('username값:', username);
    console.log('page:', searchParams.get('page'));

    // page가 없으면 1을 기본값으로 사용
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listSaveNews({ username, page }));
  }, [dispatch, searchParams]);

  return (
    <AuthDataViewer
      user={user}
      loading={loading}
      error={error}
      newsList={saveNewsList}
    />
  );
};

export default AuthDataContainer;
