import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

import * as likesAPI from '../lib/api/likes'; //

const INITIALIZE_LIKE = 'likes/INITIALIZE_LIKE'; // 모든 내용 초기화

//좋아요
const [LIKE, LIKE_SUCCESS, LIKE_FAILURE] =
  createRequestActionTypes('likes/LIKE');

//좋아요 / 싫어요 취소
const [CANCLE_LIKE, CANCLE_LIKE_SUCCESS, CANCLE_LIKE_FAILURE] =
  createRequestActionTypes('likes/CANCLE_LIKE');

//사용자의 좋아요 상태
//const [CHECK_LIKE, CHECK_LIKE_SUCCESS, CHECK_LIKE_FAILURE] =createRequestActionTypes('likes/CHECK_LIKE');

//좋아요 누른 사용자
//const [LIKE_USER, LIKE_USER_SUCCESS, LIKE_USER_FAILURE] =createRequestActionTypes('likes/LIKE_USER');

//=========
export const initialize = createAction(INITIALIZE_LIKE);
export const setLike = createAction(LIKE, (id) => id);
//export const checkLike = createAction(CHECK_LIKE, (id) => id);
export const cancleLike = createAction(CANCLE_LIKE);
//export const likeUser = createAction(LIKE_USER, (likeList) => likeList);
//--------------------

const setLikeSaga = createRequestSaga(LIKE, likesAPI.setLike);
//const checkLikeSaga = createRequestSaga(CHECK_LIKE, likesAPI.checkLike); //modul/likes.js 에 함수 추가해야함
const cancleLikeSaga = createRequestSaga(CANCLE_LIKE, likesAPI.cancleLike);
//const likeUserSaga = createRequestSaga(LIKE_USER, likesAPI.likeUser); //modul/likes.js 에 함수 추가해야함

export function* likeSaga() {
  yield takeLatest(LIKE, setLikeSaga);
  // yield takeLatest(CHECK_LIKE, checkLikeSaga);
  yield takeLatest(CANCLE_LIKE, cancleLikeSaga);
  // yield takeLatest(LIKE_USER, likeUserSaga);
}

const initialState = {
  like: {
    userId: null,
    newsId: null, //newsId, postId
  },
  likes: [],
  likeError: null,
  likeListError: null,
};

const likes = handleActions(
  {
    [INITIALIZE_LIKE]: (state) => initialState,

    [LIKE_SUCCESS]: (state, { payload: like }) => ({
      ...state,
      like,
      likeListError: null, //
    }),
    [LIKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    /*  [CHECK_LIKE_SUCCESS]: (state, { payload: like }) => ({
      ...state,
      like,
      likeListError: null, //
    }),
    [CHECK_LIKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),*/
    [CANCLE_LIKE_SUCCESS]: (state) => ({
      ...state,
      like: {
        ...state.like,
        userId: null,
        postId: null,
      },
    }),
    [CANCLE_LIKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    /* [LIKE_USER_SUCCESS]: (state, { payload: like }) => ({
      ...state,
      like,
      likeListError: null, //
    }),
    [LIKE_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),*/
  },
  initialState,
);

export default likes;
