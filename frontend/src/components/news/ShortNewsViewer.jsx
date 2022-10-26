import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import sampleImg from '../images/sample.jpg';
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from '../../../node_modules/react-speech-kit/dist/index';

import LikeDislikeButton from '../common/LikeDislikeButton';
import { HiPlay, HiPause } from 'react-icons/hi';
const PostViewerBlock = styled(Responsive)`
  background-color: ${palette.gray[2]};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  padding: 40px;
  margin-top: 4rem;
  border-radius: 2px;
`;
const PostImg = styled.div`
  //width: 100%;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  position: relative;
  .speechBtn {
    cursor: pointer;
    background-color: transparent;
    display: inherit;
    position: absolute;
    width: 70%;
    height: 100%;
    font-size: 4.5rem;
    color: white;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s;
    border: none;
    :hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .imgStyle {
    vertical-align: middle;
    transition: 0.3s;
    width: 70%;
  }
`;
const PostHead = styled.div`
  margin-bottom: 3rem;
  h1 {
    font-size: 2rem;
    line-height: 1.5;
    margin: 1rem 0 0 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3rem;
  color: black;
  min-height: 300px;
  border-bottom: 3px solid grey;
  padding-bottom: 40px;
  margin: 0 20px;

  p {
    margin: 0.5rem;
  }
`;

const ButtonBox = styled.div`
  //border-top: 3px solid grey;
  //padding-top: 4rem;
  margin: 2rem 0;
  display: flex;
  justify-content: space-around;
`;

const ShortNewsViewer = ({ news, loading, error, scrapButton, saveButton }) => {
  //tts
  const onEnd = () => {};
  const { speak, cancel, speaking } = useSpeechSynthesis({
    onEnd,
  });
  const handleOnClick = () => {
    speak({ text: news.body });
  };

  //--
  const navigate = useNavigate();
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <PostViewerBlock>
          존재하지 않는 포스트입니다.
          {error.response.status}
        </PostViewerBlock>
      );
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (!news) {
    return <PostViewerBlock>아직 포스트 데이터가 없습니다</PostViewerBlock>;
  }
  if (loading) {
    return null;
  }

  const {
    title,
    body,
    agency,
    regDate,
    like,
    url,
    link,
    _id,
    authors,
    likeCount,
    likeIds,
  } = news;

  return (
    <>
      <PostViewerBlock>
        {scrapButton}
        <PostHead>
          <h1>{title}</h1>
          <SubInfo
            username={agency + ' - ' + authors + ' 기자'} //신문사 이름
            publishedDate={regDate} //기사 날짜 (오늘날짜가 될것같긴한데.. 좀 다르니까.. 바꾸기)
            hasMarginTop
          />
        </PostHead>

        <PostImg>
          <img className="imgStyle" src={sampleImg} alt="임시 이미지" />
          {speaking ? (
            <button className="speechBtn" type="button" onClick={cancel}>
              <HiPause />
            </button>
          ) : (
            <button
              className="speechBtn"
              type="button"
              onClick={() => handleOnClick()}
            >
              <HiPlay />
            </button>
          )}

          {/*영상 혹은 이미지를 넣어야하고, 해당 아이템 클릭시 소리 재생(TTS)*/}
        </PostImg>
        <PostContent dangerouslySetInnerHTML={{ __html: body }} />

        <LikeDislikeButton like={likeCount} newsId={_id} />

        <ButtonBox>
          <Button onClick={() => window.open(url || link, '_blank')}>
            원본보기
          </Button>
          <Button onClick={() => navigate(-1)}>목록</Button>
          {saveButton}
        </ButtonBox>
      </PostViewerBlock>
    </>
  );
};

export default ShortNewsViewer;
