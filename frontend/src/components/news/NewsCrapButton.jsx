import React, { useState } from 'react';
import styled from 'styled-components';

const NewsScrapButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: grey;
  font-weight: bold;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: darkgrey;
    color: black;
  }
`;

const NewsScrapButtons = ({ onScrap }) => {
  return (
    <>
      <NewsScrapButtonsBlock>
        <ActionButton onClick={onScrap}>Scrap</ActionButton>
      </NewsScrapButtonsBlock>
    </>
  );
};

export default NewsScrapButtons;
