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
  height: 60px;
  margin: 0;
  justify-content: center;
  position: relative;
`;
const FieldList = styled.ul`
  list-style-type: none;
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
  padding: 0;
`;
const FieldMenu = styled.li`
  display: inline-block;
  width: 150px;
  height: 100%;
  line-height: 60px;
  //transition: all ease 0.3s 0s;
  transition-duration: 0.3s;

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
