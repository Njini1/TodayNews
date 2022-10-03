import React from 'react';
import AuthDataViewer from '../../components/auth/AuthDataViewer';

import { useSelector } from 'react-redux';
const AuthDataContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  return <AuthDataViewer user={user} />;
};

export default AuthDataContainer;
