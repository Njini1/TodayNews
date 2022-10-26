import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';

const LikeButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5rem 0;
`;
const LikeLabel = styled.label`
  display: flex;
  font-size: 1.25rem;
`;
const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    margin: 0 auto;
  }
`;
const LikeBtnStyle = styled.button`
  font-size: 2.5rem;
  background: transparent;
  border: none;
  color: ${palette.gray[7]};
  transition-duration: 0.2s;
  :hover {
    color: ${palette.navy};
  }
  cursor: pointer;
`;

// React.memo를 사용하여 값이 바뀔 때만 리렌더링되도록 처리
const LikesNum = React.memo(({ likeCount }) => (
  <LikeLabel>좋아요 {likeCount}</LikeLabel>
)); //숫자 바뀔때만 리렌더링
const DisLikesNum = React.memo(({ dislikeCount }) => (
  <LikeLabel>싫어요 {dislikeCount}</LikeLabel>
)); //싫어요로 변경 예정

const LikeDislikeButton = ({ like }) => {
  //like 수
  const dislike = 5;
  const [likeCount, setLikeCount] = useState(like); //좋아요수
  const [dislikeCount, setDislikeCount] = useState(dislike); //싫어요수

  //like 버튼
  const [likeActive, setLikeActive] = useState(false); //좋아요 상태
  const [dislikeActive, setDislikeActive] = useState(false); //싫어요 상태

  const onClickLike = (e) => {
    if (likeActive) {
      setLikeActive(false);
      setLikeCount(like); //like-1로 나중에 수정해야할듯
    } else {
      setLikeActive(true);
      setLikeCount(like + 1);
      if (dislikeActive) {
        //싫어요가 이미 눌린경우
        setDislikeActive(false);
        setLikeCount(like + 1);
        setDislikeCount(dislike);
      }
    }
  };
  const onClickDisLike = (e) => {
    if (dislikeActive) {
      setDislikeActive(false);
      setDislikeCount(dislike);
    } else {
      setDislikeActive(true);
      setDislikeCount(dislike + 1);
      if (likeActive) {
        //싫어요가 이미 눌린경우
        setLikeActive(false);
        setDislikeCount(dislike + 1);
        setLikeCount(like);
      }
    }
  };

  return (
    <>
      <LikeButtonBox>
        <CenterBox>
          <LikeBtnStyle onClick={onClickLike}>
            {likeActive === false ? (
              <AiOutlineLike />
            ) : (
              <AiFillLike color="#1c1259" />
            )}
          </LikeBtnStyle>

          <LikesNum likeCount={likeCount} />
        </CenterBox>

        <CenterBox>
          <LikeBtnStyle onClick={onClickDisLike}>
            {dislikeActive === false ? (
              <AiOutlineDislike />
            ) : (
              <AiFillDislike color="#1c1259" />
            )}
          </LikeBtnStyle>

          <DisLikesNum dislikeCount={dislikeCount} />
        </CenterBox>
      </LikeButtonBox>
    </>
  );
};

export default LikeDislikeButton;
