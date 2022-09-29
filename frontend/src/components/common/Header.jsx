import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import logoimg from '../images/iconSample.svg';
import palette from '../../lib/styles/palette';

const HeaderBlock = styled.div`
  position: relative;
  width: 100%;
  background: ${palette.navy};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 8rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .logo {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 2px;
    padding-top: 20px;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 10px;
    color: white;
  }
`;
const Spacer = styled.div`
  border-top: 2px solid white;
  width: 100%;

  margin-top: 1rem;
`;

const MenuBox = styled(Responsive)`
  .menu {
    display: flex;
    //justify-content: center;
    color: white;
    font-size: 1.35rem;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .menu ul {
    list-style-type: none;

    margin: 0;
    padding: 0;
    height: 70px;
  }

  .menu ul li {
    list-style-type: none;
    display: inline-block;
    border-bottom: 2px solid transparent;
    width: 200px;
    height: 100%;
  }
  .menu a {
    width: 100%;
    display: block;

    height: 100%;
    line-height: 70px;
  }
  .menu ul li:hover {
    border-bottom: 2px solid ${palette.yellow};
  }
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            <img src={logoimg} alt="logoimg" width="180px" />
          </Link>

          {user ? (
            <div className="right">
              <Button to={`/my/${user.username}`}>{user.username}</Button>
              <Button to="/" onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
              <Button to="/register">회원가입</Button>
            </div>
          )}
        </Wrapper>
        <Spacer />
        <MenuBox>
          <div className="menu">
            <ul>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? palette.yellow : 'white',
                  })}
                >
                  T-NEWS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/m-news"
                  style={({ isActive }) => ({
                    color: isActive ? palette.yellow : 'white',
                  })}
                >
                  M-NEWS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/write"
                  style={({ isActive }) => ({
                    color: isActive ? palette.yellow : 'white',
                  })}
                >
                  S-NEWS
                </NavLink>
              </li>
            </ul>
          </div>
        </MenuBox>
      </HeaderBlock>
      {/*<Spacer />*/}
    </>
  );
};

export default Header;
