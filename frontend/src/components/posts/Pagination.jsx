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

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  const prev =
    page === 1 ? undefined : buildLink({ username, tag, page: page - 1 });
  const next =
    page === lastPage
      ? undefined
      : buildLink({ username, tag, page: page + 1 });
  return (
    <PaginationBlock>
      <Button disabled={page === 1} to={`/m-news${prev}`}>
        이전
      </Button>
      <PageNumber>
        {page} / {lastPage}
      </PageNumber>
      <Button disabled={page === lastPage} to={`/m-news${next}`}>
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
