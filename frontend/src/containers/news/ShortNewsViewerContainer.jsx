import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readNews, unloadNews } from '../../modules/news';
import ShortNewsViewer from '../../components/news/ShortNewsViewer';
import { useParams } from 'react-router-dom';

/*
import { readPost, unloadPost } from '../../modules/post';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';*/

const ShortNewsViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { newsId } = useParams(); //postId -> newsId

  const dispatch = useDispatch(); //useDispatch()는 액션을 생성, useSelecotr()는 상태를 조회해줌
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
  }, [dispatch, newsId]);
  /*
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };*/

  //const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <ShortNewsViewer
      news={news}
      loading={loading}
      error={error}
      /*actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }*/
    />
  );
};

export default ShortNewsViewerContainer;
