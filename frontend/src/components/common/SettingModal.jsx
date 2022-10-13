import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import palette from '../../lib/styles/palette';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AskModalBlock = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin: 0.7rem 0;
    font-weight: bold;
  }
  .buttons {
    margin-top: 1.2rem;
    display: flex;
    justify-content: flex-end;
  }

  .flexBox {
    display: flex;
    flex-direction: column;
    input {
      width: 100%;
      border: 2px solid gray;
      border-radius: 3px;
      font-size: 1rem;
      &:focus {
        border: 2px solid navy;
        background: ${palette.gray[0]};
        color: ${palette.navy};
      }
    }
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const SettingModal = ({ visible, title, onConfirm, onCancel }) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <AskModalBlock>
        <h2>{title}</h2>

        <form className="flexBox" autocomplete="off">
          <p>현재 비밀번호</p>
          <input type="password" />
          <p>새로운 비밀번호</p>
          <input type="password" />
          <p>비밀번호 확인</p>
          <input type="password" />
        </form>

        <div className="buttons">
          <StyledButton onClick={onCancel}>취소</StyledButton>
          <StyledButton cyan onClick={onConfirm}>
            변경
          </StyledButton>
        </div>
      </AskModalBlock>
    </Fullscreen>
  );
};

export default SettingModal;
