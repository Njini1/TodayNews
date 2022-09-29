import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.div`
  height: 100px;
  margin-top: 100px;
  background: #1c1259;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterData = styled.p`
  color: white;
  font-size: 1rem;
`;

const Footer = () => {
  return (
    <FooterBlock>
      <FooterData>@ 2022 Today News</FooterData>
    </FooterBlock>
  );
};

export default Footer;
