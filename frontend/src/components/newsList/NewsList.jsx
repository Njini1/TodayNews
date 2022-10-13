import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import { Link } from 'react-router-dom';
import sampleimg from '../images/sample.jpg';
import palette from '../../lib/styles/palette';

import { useSearchParams } from 'react-router-dom';

const NewsListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const HeadLineBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
`;
const NewsItemBlock = styled.div`
  padding: 20px;
  border: 3px solid ${palette.gray[6]};
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: 200px auto;
  transition: all ease 0.5s 0s;

  &:hover {
    border: 3px solid ${palette.navy};
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0;
    margin-top: 0;
  }
  p {
    margin-top: 2rem;
  }
`;

const GridBox = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 310px));
  //grid-template-rows: 400px 400px 400px;
  justify-items: center;
  gap: 30px;
  margin-top: 4rem;
  background: white;
  margin-bottom: 3rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(310px, 400px));
  }
`;

const NewsItem = ({ news }) => {
  //const { regDate, agency, title, _id } = news;
  const { regDate, title, _id, agency } = news;
  return (
    <Link to={`/today-news/${_id}`}>
      <NewsItemBlock>
        <img src={sampleimg} width="100%" height="200px" alt="임시파일" />

        <HeadLineBlock>
          <h2>{title}</h2>
          <SubInfo username={agency} publishedDate={regDate} />
        </HeadLineBlock>
      </NewsItemBlock>
    </Link>
  );
};

const NewsList = ({ newsList, loading, error }) => {
  const [searchParams] = useSearchParams();
  const field = searchParams.get('field') || '전체';

  // 에러 발생 시
  if (error) {
    return <GridBox>에러가 발생했습니다.</GridBox>;
  }

  return (
    <NewsListBlock>
      <h2>{field}</h2>
      <GridBox>
        {!loading && newsList && (
          <>
            {newsList.map((news) => (
              <NewsItem news={news} key={news._id} />
            ))}
          </>
        )}
      </GridBox>
    </NewsListBlock>
  );
};

export default NewsList;
