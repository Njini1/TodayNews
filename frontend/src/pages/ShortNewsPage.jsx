import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ShortNewsViewerContainer from '../containers/news/ShortNewsViewerContainer';
import Footer from '../components/common/Footer';

const ShortNewsPage = () => {
  return (
    <>
      <HeaderContainer />
      <ShortNewsViewerContainer />
      <Footer />
    </>
  );
};

export default ShortNewsPage;
