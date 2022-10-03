import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import news, { newsSaga } from './news';
import newsList, { shortNewsSaga } from './newsList';
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  news,
  newsList,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    newsSaga(),
    shortNewsSaga(),
  ]);
}

export default rootReducer;
