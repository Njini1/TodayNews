import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { IoBuildOutline, IoAddCircleOutline } from 'react-icons/io5';
//import Button from '../common/Button';

const BackBlock = styled(Responsive)`
  border: 2px solid gray;
  padding: 20px;
  margin-top: 4rem;
  border-radius: 5px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`;

const DataBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid gray;
  padding-bottom: 2rem;

  table {
    font-size: 1.25rem;
    border-top: 2px solid gray;
    border-collapse: collapse;
    width: 80%;
    margin: 0 auto;
    background: ${palette.gray[3]};
  }
  td {
    border-bottom: 2px solid white;
    padding: 10px;
  }
`;

const UserDataBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 4fr;
  width: 80%;
  margin: 0 auto;

  input {
    border: 2px solid gray;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 1.25rem;
    padding-left: 10px;
  }
`;

const HeadBox = styled.div`
  justify-content: space-between;
  display: flex;
  margin: 20px;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
`;

const AuthDataViewer = ({ user }) => {
  const username = user.username;
  return (
    <>
      <BackBlock>
        <DataBlock>
          <HeadBox>
            <h2>내 정보</h2>
            <IoBuildOutline />
            {/*<button>정보변경</button>*/}
          </HeadBox>
          <UserDataBlock>
            <h3>아이디</h3>
            <input value={username} disabled />
          </UserDataBlock>
        </DataBlock>

        <DataBlock>
          <HeadBox>
            <h2>작성한 뉴스</h2>
            <IoAddCircleOutline />
            {/*<button>더 보기</button>*/}
          </HeadBox>

          <table>
            <tr>
              <td>헤드라인 1</td>
            </tr>
            <tr>
              <td>헤드라인 2</td>
            </tr>
            <tr>
              <td>헤드라인 3</td>
            </tr>
          </table>
        </DataBlock>

        <DataBlock>
          <HeadBox>
            <h2>저장한 뉴스</h2>
            <IoAddCircleOutline />
            {/*<button>더 보기</button>*/}
          </HeadBox>
          <table>
            <tr>
              <td>헤드라인 1</td>
            </tr>
            <tr>
              <td>헤드라인 2</td>
            </tr>
            <tr>
              <td>헤드라인 3</td>
            </tr>
          </table>
        </DataBlock>
      </BackBlock>
    </>
  );
};

export default AuthDataViewer;
