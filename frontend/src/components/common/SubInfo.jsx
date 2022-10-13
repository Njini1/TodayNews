import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const SubInfoBlock = styled.div`
  font-size: 1rem;
  //justify-content: right;
  //display: flex;
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: grey;

  /* span 사이에 가운뎃점 문자 보여주기*/
  span + span:before {
    color: grey;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          {username}
          {/*<Link to={`/?username=${username}`}>{username}</Link>*/}
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
