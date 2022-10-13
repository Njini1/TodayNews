import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { NavLink } from 'react-router-dom';
const FieldBlock = styled.div`
  width: 100%;
  background: ${palette.gray[4]};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  height: 55px;
  margin: 0;
  justify-content: center;
  position: relative;
  @media (max-width: 600px) {
    height: 100px;
  }
  /*
  white-space: nowrap;
  overflow: auto;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; //Firefox 
  ::-webkit-scrollbar {
    display: none; //Chrome, Safari, Opera
  }*/
`;
const FieldList = styled.ul`
  list-style-type: none;

  text-align: center;
  margin: 0;
  padding: 0;
`;
const FieldMenu = styled.li`
  display: inline-block;
  width: 150px;
  height: 100%;
  line-height: 55px;
  //transition: all ease 0.3s 0s;
  transition-duration: 0.3s;
  font-size: 1.2rem;
  :hover {
    color: ${palette.navy};
    font-weight: bolder;
    background-color: ${palette.yellow};
    //border-bottom: 2px solid ${palette.navy};
  }
  a {
    display: block;
    height: 100%;
    width: 100%;
  }

  /* 브라우저 크기에 따라 가로 사이즈 변경 */
  @media (max-width: 1024px) {
    width: 120px;
  }
  @media (max-width: 768px) {
    width: 100px;
  }
  @media (max-width: 600px) {
    width: 120px;
    height: 50%;
    font-size: 1rem;
    line-height: 50px;
  }
`;

const Field = () => {
  const categoryList = ['정치', '경제', '사회', '생활-문화', 'IT-과학'];
  return (
    <>
      <FieldBlock>
        <FieldList>
          <FieldMenu>
            <NavLink
              to="/"
              key="전체"
              style={({ isActive }) => ({
                //color: isActive ? palette.red : palette.gray,
              })}
            >
              전체
            </NavLink>
          </FieldMenu>
          {categoryList.map((field) => (
            <FieldMenu key={field}>
              <NavLink
                to={`/?field=${field}`}
                end
                style={({ isActive }) => ({
                  //color: isActive ? palette.red : palette.gray,
                })}
              >
                {field}
              </NavLink>
            </FieldMenu>
          ))}
        </FieldList>
      </FieldBlock>
    </>
  );
};

export default Field;
