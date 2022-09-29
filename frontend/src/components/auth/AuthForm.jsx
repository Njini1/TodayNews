import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.navy};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;

  border: 2px solid gray;
  border-radius: 3px;
  //border-bottom: 1px solid gray;
  // padding-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    border: 2px solid navy;
    background: ${palette.gray[0]};
    color: ${palette.navy};
    // border-bottom: 1px solid ${palette.navy};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const LJLink = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: gray;
    text-decoration: underline;
    &:hover {
      color: ${palette.navy};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const ErrorMessage = styled.div`
  color: #ee4266;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <>
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop fullWidth>{text}</ButtonWithMarginTop>
      </form>

      <LJLink>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </LJLink>
    </AuthFormBlock>
  );
};

export default AuthForm;
