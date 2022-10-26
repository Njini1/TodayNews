import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shortNewsAPI from '../lib/api/shortNews';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'save/INITIALIZE'; // 모든 내용 초기화
const [SAVE_NEWS, SAVE_NEWS_SUCCESS, SAVE_NEWS_FAILURE] =
  createRequestActionTypes('save/SAVE_NEWS');

const SET_SAVE_DATA = 'save/SET_SAVE_DATA';

export const initialize = createAction(INITIALIZE);
export const save = createAction(SAVE_NEWS, ({ username, newsId }) => ({
  username,
  newsId,
}));

export const setSaveData = createAction(
  SET_SAVE_DATA,
  ({ username, newsId }) => ({
    username,
    newsId,
  }),
);

const saveNewsSaga = createRequestSaga(SAVE_NEWS, shortNewsAPI.saveNews);

export function* saveSaga() {
  yield takeLatest(SAVE_NEWS, saveNewsSaga);
}

const initialState = {
  userId: '',
  newsId: '',
  error: null,
};

const saveNews = handleActions(
  {
    //[INITIALIZE]: (state) => initialState,
    [SET_SAVE_DATA]: (state, { payload: { username, newsId } }) => ({
      ...state,
      userId: username,
      newsId: newsId,
    }),
    // 저장 성공
    [SAVE_NEWS_SUCCESS]: (state, { payload: { username, newsId } }) => ({
      ...state,
      userId: username,
      newsId: newsId,
    }),
    // 저장 실패
    [SAVE_NEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default saveNews;
