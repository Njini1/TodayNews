import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 3rem auto 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ username, field, page }) => {
  const query = qs.stringify({ field, page });
  return username
    ? `/today-news/${username}?${query}`
    : `/today-news/?${query}`;
};

const NPagination = ({ username, page, lastPage, field }) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1
            ? undefined
            : buildLink({ username, field, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>
        {page} / {lastPage}
      </PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, field, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default NPagination;
