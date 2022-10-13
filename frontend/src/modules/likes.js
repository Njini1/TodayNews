import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

import * as likesAPI from '../lib/api/likes'; //

const [Like, Like_SUCCESS, Like_FAILURE] =
  createRequestActionTypes('news/READ_NEWS');
//const [Dislike,Dislike_SUCCESS, Dislike_FAILURE] =
createRequestActionTypes('news/READ_NEWS');

const UN_Like = 'news/UNLOAD_NEWS'; // 포스트 페이지에서 벗어날 때 데이터 비우기

//--------------------
export const readNews = createAction(Like, (id) => id);
export const unloadNews = createAction(UN_Like);

const readNewsSaga = createRequestSaga(Like, likesAPI.readNews);
export function* newsSaga() {
  yield takeLatest(Like, readNewsSaga);
}

const initialState = {
  like: {
    userId: null,
    postId: null, //newsId, postId
  },
  likes: [],
  likeError: null,
  likeListError: null,
};

const likes = handleActions(
  {
    [Like_SUCCESS]: (state, { payload: like }) => ({
      ...state,
      like,
      likeListError: null, //
    }),
    [Like_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UN_Like]: () => initialState,
  },
  initialState,
);

export default likes;
