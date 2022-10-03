import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NewsListContainer from '../containers/NewsList/NewsListContainer';
import NPaginationContainer from '../containers/NewsList/NPaginationContain';
import Footer from '../components/common/Footer';
import Field from '../components/common/Field';
const NewsPage = () => {
  return (
    <>
      <HeaderContainer />
      <Field />
      <NewsListContainer />
      <NPaginationContainer />
      <Footer />
    </>
  );
};

export default NewsPage;
