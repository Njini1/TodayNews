import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import sampleImg from '../images/sample.jpg';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

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
  //color: ${palette.gray[7]};
  border: none;
  :hover {
    color: ${palette.red};
  }
  cursor: pointer;
`;
//post->news
const ShortNewsViewer = ({ news, loading, error }) => {
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

  const { title, body, agency, regDate, like, link } = news;

  return (
    <>
      <PostViewerBlock>
        {/*{actionButtons}*/}
        <PostHead>
          <h1>{title}</h1>
          <SubInfo
            username={agency} //신문사 이름
            publishedDate={regDate} //기사 날짜 (오늘날짜가 될것같긴한데.. 좀 다르니까.. 바꾸기)
            hasMarginTop
          />
        </PostHead>

        <PostImg>
          <img src={sampleImg} alt="임시 이미지" width="70%" />{' '}
          {/*영상 혹은 이미지를 넣어야하고, 해당 아이템 클릭시 소리 재생(TTS)*/}
        </PostImg>

        <PostContent dangerouslySetInnerHTML={{ __html: body }} />

        <LikeButtonBox>
          <CenterBox>
            <LikeBtnStyle>
              <AiOutlineLike />
            </LikeBtnStyle>
            <LikeLabel>좋아요 {like}</LikeLabel>
          </CenterBox>
          <CenterBox>
            <LikeBtnStyle>
              <AiOutlineDislike />
            </LikeBtnStyle>
            <LikeLabel>싫어요 {0}</LikeLabel>
          </CenterBox>
        </LikeButtonBox>

        <ButtonBox>
          <Button
            onClick={() => window.open('https://www.naver.com', '_blank')}
          >
            원본보기
          </Button>
          <Button to="/">목록</Button>
          <Button to="#">저장하기</Button>
        </ButtonBox>
      </PostViewerBlock>
    </>
  );
};

export default ShortNewsViewer;
