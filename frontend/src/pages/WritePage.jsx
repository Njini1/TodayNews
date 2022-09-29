import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
//import ProductInfoContainer from '../containers/write/ProductInfoContainer';
import styled from 'styled-components';
import Footer from '../components/common/Footer';
const FlexBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const WritePage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <EditorContainer />
        <FlexBlock>
          <TagBoxContainer />
        </FlexBlock>
        <WriteActionButtonsContainer />
      </Responsive>
      <Footer />
    </>
  );
};

export default WritePage;
