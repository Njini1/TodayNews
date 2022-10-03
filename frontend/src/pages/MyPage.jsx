import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/common/Footer';
import AuthDataContainer from '../containers/auth/AuthDataContainer';

const MyPage = () => {
  return (
    <>
        <HeaderContainer />
        <AuthDataContainer />
        <Footer/>
    </>
  );
};

export default MyPage;