import React, { useState } from 'react';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: grey;
  font-weight: bold;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: darkgrey;
    color: black;
  }
  & + & {
    margin-left: 0.7rem;
  }
`;

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>

      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtons;
