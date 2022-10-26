import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import sampleImg from '../images/sample.jpg';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';

const PostViewerBlock = styled(Responsive)`
  // background-color: ${palette.gray[2]};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  padding: 40px;
  margin-top: 4rem;
  border-radius: 2px;
`;
const PostImg = styled.div`
  //width: 100%;
  width: auto;
  margin: 50px 0;
  display: flex;
  justify-content: center;
`;
const PostHead = styled.div`
  margin-bottom: 3rem;
  h1 {
    font-size: 2rem;
    line-height: 1.5;
    margin: 0;
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

const LikeButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5rem 0;
  font-size: 2.5rem;
`;
const LikeLabel = styled.label`
  display: flex;
  font-size: 1.25rem;
`;
const LikeBtnStyle = styled.button`
  border: none;
  background: transparent;
  font-size: 2.5rem;
  :hover {
    color: red;
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    margin: 0 auto;
  }
`;

//--
const ShareButtonStyle = styled.button`
  font-weight: bold;
  font-size: 1.5rem;
  border: none;
  outline: none;
  border-radius: 50%;
  color: grey;
  margin-left: 0.7rem;
  cursor: pointer;
  &:hover {
    background: darkgrey;
    color: black;
  }
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  const navigate = useNavigate();
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (loading || !post) {
    return null;
  }

  const { title, body, user, publishedDate, tags } = post;
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: body,
        url: window.location.href,
      });
    } else {
      alert('공유하기가 지원되지 않는 환경 입니다.');
    }
  };
  return (
    <>
      <PostViewerBlock>
        {/*<ShareButtonStyle onClick={share}>
          <AiOutlineShareAlt />
  </ShareButtonStyle>*/}
        {actionButtons}
        <PostHead>
          <h1>{title}</h1>
          <SubInfo
            username={user.username}
            publishedDate={publishedDate}
            hasMarginTop
          />
          <Tags tags={tags} />
        </PostHead>

        <PostImg>
          <img src={sampleImg} alt="임시 이미지" width="60%" />
        </PostImg>

        <PostContent dangerouslySetInnerHTML={{ __html: body }} />

        <LikeButtonBox>
          {/* <CenterBox>
            <LikeBtnStyle>
              <AiOutlineLike />
            </LikeBtnStyle>
            <LikeLabel>좋아요 0</LikeLabel>
          </CenterBox>
          <CenterBox>
            <LikeBtnStyle>
              <AiOutlineDislike />
            </LikeBtnStyle>

            <LikeLabel>싫어요 0</LikeLabel>
          </CenterBox>*/}
        </LikeButtonBox>

        <ButtonBox>
          <Button
            onClick={() => window.open('https://news.naver.com/', '_blank')}
          >
            원본보기
          </Button>
          <Button onClick={() => navigate(-1)}>목록</Button>
          <Button onClick={share}>공유하기</Button>
        </ButtonBox>
      </PostViewerBlock>
    </>
  );
};

export default PostViewer;
