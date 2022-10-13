import React, { useState, useEffect } from 'react';
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

const LikeDislikeButton = ({ like, onClick }) => {
  //https://ji-gwang.tistory.com/51
  //https://darrengwon.tistory.com/832
  /* const [Likes, setLikes] = useState(0);
  const [LikeActions, setLikeActions] = useState('');
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeActions, setDislikeActions] = useState('');*/

  let [likes, setLike] = useState(false);
  let [dislikes, setDislike] = useState(false);

  const likesActive = (e) => {
    if (dislikes) disLikesActive(e); //싫어요가 이미 눌린경우

    setLike((prev) => {
      return !prev;
    });
  };
  const disLikesActive = (e) => {
    if (likes) likesActive(e); //좋아요가 이미 눌린경우

    setDislike((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <LikeButtonBox>
        <CenterBox>
          <LikeBtnStyle onClick={likesActive}>
            {likes === false ? (
              <AiOutlineLike />
            ) : (
              <AiFillLike color="#1c1259" />
            )}
          </LikeBtnStyle>

          <LikeLabel>좋아요 {like}</LikeLabel>
        </CenterBox>

        <CenterBox>
          <LikeBtnStyle onClick={disLikesActive}>
            {dislikes === false ? (
              <AiOutlineDislike />
            ) : (
              <AiFillDislike color="#1c1259" />
            )}
          </LikeBtnStyle>

          <LikeLabel>싫어요 {0}</LikeLabel>
        </CenterBox>
      </LikeButtonBox>
    </>
  );
};

export default LikeDislikeButton;
