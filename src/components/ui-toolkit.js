import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

export const Card = styled.div.attrs((props) => ({
  margin: props.margin || 0,
  padding: props.padding || 0,
}))`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  background: #fff;

  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

export const InputGroup = styled.div`
  margin: 16px 0;
  width: 100%;

  input,
  textarea {
    color: #676767;
    width: 100%;
    background-color: #f5f5f5;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
  }

  textarea {
    resize: vertical;
  }

  & > * {
    display: block;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#6ba72b' : '#f5f5f5')};
  border: none;
  border-radius: 4px;
  color: ${(props) => (props.primary ? '#fff' : 'inherit')};
  cursor: pointer;
  margin-top: 16px;
  min-width: 160px;
  padding: 4px;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    color: #fff;
    background-color: ${(props) => (props.primary ? '#333333' : '#6ba72b')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const IconFeedback = styled.div`
  margin-left: -16px;
  margin-right: 8px;
  display: inline-block;
  animation: ${spin} 2s infinite linear;
`;

export const Submit = ({ children, loading, ...rest }) => (
  <Button disabled={loading} primary {...rest}>
    {loading && (
      <IconFeedback>
        <FontAwesomeIcon icon={faSyncAlt} />
      </IconFeedback>
    )}
    {children}
  </Button>
);

const AlertDangerBase = styled.div`
  background-color: #c0392b;
  color: #fff;
  border-radius: 4px;
  padding: 8px;
  margin-top: 16px;

  & > svg {
    margin: 0 8px;
  }
`;

export const AlertDanger = ({ children }) => {
  return (
    <AlertDangerBase>
      <FontAwesomeIcon icon={faTimesCircle} />
      {children}
    </AlertDangerBase>
  );
};
