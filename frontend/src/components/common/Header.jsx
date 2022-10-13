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
    padding-top: 20px;
    margin: auto;
    width: 180px;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 10px;
    color: white;
  }
  @media (max-width: 768px) {
    height: 5rem;
    .logo {
      width: 130px;
      padding-top: 10px;
    }
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
    width: 190px;
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

  @media (max-width: 768px) {
    .menu {
      font-size: 1.2rem;
    }

    .menu ul {
      height: 60px;
    }
    .menu ul li {
      width: 170px;
      height: 100%;
    }
    .menu a {
      line-height: 60px;
    }
  }
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/">
            <img src={logoimg} alt="logoimg" className="logo" />
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
                  end
                  style={({ isActive }) => ({
                    color: isActive ? palette.yellow : 'white',
                  })}
                >
                  Today News
                </NavLink>
              </li>
              {user ? (
                <li>
                  <NavLink
                    to="/scrap-news"
                    style={({ isActive }) => ({
                      color: isActive ? palette.yellow : 'white',
                    })}
                  >
                    Scrap News
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </MenuBox>
      </HeaderBlock>
      {/*<Spacer />*/}
    </>
  );
};

export default Header;
