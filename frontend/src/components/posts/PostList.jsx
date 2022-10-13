import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
//import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import sampleimg from '../images/sample.jpg';
import palette from '../../lib/styles/palette';
//import { AiFillPlusCircle } from 'react-icons/ai';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  /*position: fixed;
  line-height: 63px;
  bottom: 100px; //위치
  right: 200px; //위치
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;*/
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;
const HeadLineBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
`;
const PostItemBlock = styled.div`
  // background: ${palette.gray[2]};
  padding: 20px;
  border: 3px solid transparent;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: 200px auto;
  transition: all ease 0.8s 0s;
  &:hover {
    border: 3px solid ${palette.navy};
  }
  h1 {
    font-size: 1.5rem;
    margin-bottom: 0;
    margin-top: 0;
  }
  p {
    margin-top: 2rem;
  }
  img {
    border: 1px solid gray;
  }
`;

const GridBox = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 310px));
  //grid-template-columns: 1fr 1fr 1fr;

  justify-items: center;
  gap: 30px;
  margin-top: 4rem;
  background: white;
  margin-bottom: 3rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(310px, 400px));
  }
`;

const PostItem = ({ post }) => {
  //const { publishedDate, user, tags, title, body, _id } = post;
  const { publishedDate, user, title, _id } = post;
  return (
    <Link to={`/scrap-news/${user.username}/${_id}`}>
      <PostItemBlock>
        <img src={sampleimg} width="100%" height="200px" alt="임시파일" />

        <HeadLineBlock>
          <h1>{title}</h1>
          <SubInfo
            username={user.username}
            publishedDate={new Date(publishedDate)}
          />
          {/*<Tags tags={tags} />*/}
        </HeadLineBlock>
      </PostItemBlock>
    </Link>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  // 에러 발생 시
  if (error) {
    return <GridBox>에러가 발생했습니다.</GridBox>;
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button to="/write">
            새로운 글 작성하기
            {/*<AiFillPlusCircle style={{ width: '100%' }} />*/}
          </Button>
        )}
      </WritePostButtonWrapper>

      <GridBox>
        {!loading && posts && (
          <>
            {posts.map((post) => (
              <PostItem post={post} key={post._id} />
            ))}
          </>
        )}
      </GridBox>
    </PostListBlock>
  );
};

export default PostList;
