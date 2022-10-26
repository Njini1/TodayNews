import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readNews, unloadNews } from '../../modules/news';
import Button from '../../components/common/Button';
import ShortNewsViewer from '../../components/news/ShortNewsViewer';
import { useParams } from 'react-router-dom';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { setScrapData } from '../../modules/write';

import NewsScrapButtons from '../../components/news/NewsCrapButton';

import { setSaveData, save } from '../../modules/saveNews';

const ShortNewsViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { newsId } = useParams();
  const { username } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { news, error, loading } = useSelector(
    ({ news, loading }) => ({
      news: news.news,
      error: news.error,
      loading: loading['shortNews/READ_NEWS'],
    }), //일단 post-> news
  );

  useEffect(() => {
    dispatch(readNews(newsId)); //newsId파람을 readNews함수에 전달해줌
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadNews());
    };
  }, [dispatch, newsId]);

  const onScrap = (news) => {
    const title = news.title;
    const body = news.original;
    dispatch(setScrapData({ title, body }));
    navigate('/write');
  };

  const onSave = () => {
    //const { username } = null;
    //const username = '633015aebaf9658befae31e8';
    dispatch(setSaveData({ username, newsId }));
    dispatch(save({ username, newsId }));
    console.log('onSave함수 newsId값:', newsId);
    alert('뉴스를 저장했습니다. 마이페이지에서 확인하세요.');
    return;
  };

  return (
    <ShortNewsViewer
      news={news}
      loading={loading}
      error={error}
      //scrapButton={<NewsScrapButtons onScrap={onScrap} />}
      scrapButton={<Button onClick={(e) => onScrap(news)}>scrap</Button>}
      saveButton={<Button onClick={(e) => onSave()}>저장하기</Button>}
    />
  );
};

export default ShortNewsViewerContainer;
