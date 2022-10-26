import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//import { readNews, unloadNews } from '../../modules/news';
import {
  checkLike,
  cancleLike,
  initializeLike,
  psotLike,
  likeUser,
} from '../../modules/likes';
import LikeDislikeButton from '../../components/common/LikeDislikeButton';

//https://velog.io/@jengyoung/MOONDEUK-2021days-%EC%9D%BC%EA%B8%B0-%EC%A2%8B%EC%95%84%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84 참고
const LikeDislikeContainer = () => {
  const dispatch = useDispatch();
  const { like, likes, user, news } = useSelector(
    ({ likeReducer, userReducer, newsReducer }) => ({
      likes: likeReducer.likes,
      user: userReducer.user,
      news: newsReducer.news,
      like: likeReducer.like,
    }),
  );

  const newsId = news ? news._id : null;
  const userId = user ? user._id : null;

  useEffect(() => {
    dispatch(initializeLike());
    if (!userId || !newsId) return;
    dispatch(checkLike({ userId, newsId }));
  }, [dispatch, newsId, userId]);

  useEffect(() => {
    dispatch(likeUser(newsId));
  }, [newsId, dispatch, like]);

  const onLike = () => dispatch(psotLike({ userId, newsId }));
  const onDislike = () => dispatch(cancleLike({ userId, newsId }));

  // 처음 마운트될 때 포스트 읽기 API 요청
  /* const { newsId } = useParams();

  const dispatch = useDispatch();
  const { news, error, loading } = useSelector(
    ({ news, loading }) => ({
      news: news.news,
      error: news.error,
      loading: loading['news/READ_NEWS'],
    }), //일단 post-> news
  );

  useEffect(() => {
    dispatch(readNews(newsId)); //newsId파람을 readNews함수에 전달해줌
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadNews());
    };
  }, [dispatch, newsId]);*/

  return <LikeDislikeButton />;
};

export default LikeDislikeContainer;
