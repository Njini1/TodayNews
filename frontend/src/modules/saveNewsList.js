import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shortNewsAPI from '../lib/api/shortNews';
import { takeLatest } from 'redux-saga/effects';

const [LIST_SAVE_NEWS, LIST_SAVE_NEWS_SUCCESS, LIST_SAVE_NEWS_FAILURE] =
  createRequestActionTypes('shortNews/LIST_SAVE_NEWS'); //LIST_SAVE_NEWS의 SUCCESS, FAILURE 생성

export const listSaveNews = createAction(
  LIST_SAVE_NEWS,
  ({ username, page }) => ({
    username,
    page,
  }),
);

const listSaveNewsSaga = createRequestSaga(
  LIST_SAVE_NEWS,
  shortNewsAPI.listSaveNews,
);
export function* saveNewsSaga() {
  yield takeLatest(LIST_SAVE_NEWS, listSaveNewsSaga);
}

const initialState = {
  saveNewsList: null,
  error: null,
  lastPage: 1,
};

const saveNewsList = handleActions(
  {
    [LIST_SAVE_NEWS_SUCCESS]: (
      state,
      { payload: saveNewsList, meta: response },
    ) => ({
      ...state,
      saveNewsList,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_SAVE_NEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default saveNewsList;
