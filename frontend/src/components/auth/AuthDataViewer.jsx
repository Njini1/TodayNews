import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { AiOutlineSetting, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteSaveNews } from '../../lib/api/shortNews';
import SettingModal from '../common/SettingModal';
import SampleImg from '../images/sample.jpg';

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
  margin: 0 auto;
  width: 80%;
  h3 {
    margin-bottom: 0;
  }
  input {
    border: 2px solid gray;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 1.25rem;
    padding-left: 10px;
    width: 100%;
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
  .userBtn {
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover {
      color: ${palette.yellow};
    }
  }
`;

const SaveNewsListBlock = styled.div`
  margin: 0 auto;
  width: 85%;
  max-height: 750px;
  overflow: auto;
  padding: 0 5%;
`;
const SaveNewsItemBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid ${palette.gray[6]};

  align-items: center;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;

      border: 2px solid ${palette.navy};
    }
  }
  .aa {
    text-align: right;
  }
  h2 {
    margin: 0.5rem 0;
  }
  .contents {
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal; //공백처리
    }
  }
  & + & {
    margin-top: 1.2rem;
    padding-bottom: 1rem;
  }
  .deleteBtn {
    background: transparent;
    border: none;
    margin: 0;
    align-items: right;
    color: ${palette.gray[6]};
    cursor: pointer;
    font-size: 1.5rem;
    &:hover {
      color: ${palette.navy};
    }
    align-self: flex-end;
  }
`;

const SaveNewsItem = ({ news }) => {
  const { title, agency, authors, body, _id } = news.newsId;
  //const saveNewsId = _id;
  const saveNewsId = news._id;
  const onRemove = async () => {
    try {
      await deleteSaveNews(saveNewsId);
      alert(saveNewsId);
    } catch (e) {
      console.log(e);
    }
  };
  /*const dispatch = useDispatch();
  const onRemove = () => {
    dispatch(deleteSaveNews(saveNewsId));
    alert('삭제되었습니다.');
  };*/

  return (
    <SaveNewsItemBox>
      <button className="deleteBtn" onClick={() => onRemove()}>
        <AiOutlineDelete />
      </button>
      <div className="contnets">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: body }} />
        <p className="aa">
          {agency} - {authors} 기자
        </p>
      </div>
    </SaveNewsItemBox>
  );
};

const AuthDataViewer = ({ user, loading, error, newsList }) => {
  const username = user.username;

  const [modal, setModal] = useState(false);
  const onSettingClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
  };

  return (
    <>
      <BackBlock>
        <DataBlock>
          <HeadBox>
            <h2>내 정보</h2>
            <button className="userBtn" onClick={onSettingClick}>
              <AiOutlineSetting />
            </button>
          </HeadBox>
          <UserDataBlock>
            <h3>아이디</h3>
            <input value={username} disabled />
          </UserDataBlock>
        </DataBlock>

        <DataBlock>
          <HeadBox>
            <h2>저장한 뉴스</h2>
            {/*<button>더 보기</button>*/}
          </HeadBox>
          <SaveNewsListBlock>
            {!newsList && <p>저장된 데이터없듬</p>}
            {!loading && newsList && (
              <>
                {newsList.map((news) => (
                  <SaveNewsItem news={news} key={news._id} />
                ))}
              </>
            )}
          </SaveNewsListBlock>
        </DataBlock>
      </BackBlock>
      <SettingModal
        modaltitle="비밀번호 변경"
        visible={modal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default AuthDataViewer;
