import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Toggle = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  margin-top: 6px;
  margin-bottom: 6px;
  margin-right: 8px;
  background-color: ${({ checked }) => (checked ? '#6ba72b' : '#ffffff')};
  border-color: #aaa;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;

const FlexLabel = styled.label`
  display: flex;
  align-items: ${({ align }) => align || 'center'};
  cursor: pointer;
  margin: 8px 0;
`;

const CheckboxLabel = styled.span`
  color: ${({ checked }) => (checked ? '#aaa' : '#67676')};
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
  white-space: pre-line;
`;

export const Checkbox = ({ label, align, checked, onCheck }) => {
  return (
    <FlexLabel align={align}>
      <HiddenInput type="checkbox" value={checked} onChange={onCheck} />
      <Toggle checked={checked}>
        <FontAwesomeIcon icon={faCheck} color="#ffffff" size="sm" />
      </Toggle>
      <CheckboxLabel checked={checked}>{label}</CheckboxLabel>
    </FlexLabel>
  );
};

export default Checkbox;
