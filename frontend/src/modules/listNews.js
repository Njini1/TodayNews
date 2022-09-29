import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shortNewsAPI from '../lib/api/shortNews';
import { takeLatest } from 'redux-saga/effects';
//POSTS->NEWS
const [LIST_NEWS, LIST_NEWS_SUCCESS, LIST_NEWS_FAILURE] =
  createRequestActionTypes('shortNews/LIST_NEWS'); //LIST_NEWS의 SUCCESS, FAILURE 생성

//tag->shortNewsField
export const listNews = createAction(
  LIST_NEWS,
  ({ shortNewsField, username, page }) => ({
    shortNewsField,
    username,
    page,
  }),
);

const listNewsSaga = createRequestSaga(LIST_NEWS, shortNewsAPI.listNews);
export function* shortNewsSaga() {
  yield takeLatest(LIST_NEWS, listNewsSaga);
}

const initialState = {
  shortNews: null,
  error: null,
  lastPage: 1,
};

const shortNews = handleActions(
  {
    [LIST_NEWS_SUCCESS]: (state, { payload: shortNews, meta: response }) => ({
      ...state,
      shortNews,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_NEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default shortNews;
