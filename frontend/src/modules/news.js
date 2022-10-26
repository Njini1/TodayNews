import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shortNewsAPI from '../lib/api/shortNews';
import { takeLatest } from 'redux-saga/effects';

const [READ_NEWS, READ_NEWS_SUCCESS, READ_NEWS_FAILURE] =
  createRequestActionTypes('shortNews/READ_NEWS');
const UNLOAD_NEWS = 'shortNews/UNLOAD_NEWS'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readNews = createAction(READ_NEWS, (id) => id);
export const unloadNews = createAction(UNLOAD_NEWS);

const readNewsSaga = createRequestSaga(READ_NEWS, shortNewsAPI.readNews);

export function* newsSaga() {
  yield takeLatest(READ_NEWS, readNewsSaga);
}

const initialState = {
  news: null,
  error: null,
};

const news = handleActions(
  {
    [READ_NEWS_SUCCESS]: (state, { payload: news }) => ({
      ...state,
      news,
    }),
    [READ_NEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [UNLOAD_NEWS]: () => initialState,
  },
  initialState,
);

export default news;
