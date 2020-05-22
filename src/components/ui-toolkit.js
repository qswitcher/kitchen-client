import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faSyncAlt,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

export const Card = styled.div.attrs((props) => ({
  margin: props.margin || 0,
  padding: props.padding || 0,
  maxWidth: props.maxWidth || 'auto',
}))`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  background: #fff;

  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  max-width: ${(props) => props.maxWidth};
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  line-height: 48px;
  min-height: 48px;

  @media (min-width: 768px) {
    line-height: inherit;
    min-height: auto;
  }
`;

export const EmbedLink = styled(Link)`
  color: #6ba72b;
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
    background-color: rgba(
      107,
      167,
      43,
      0.5
    ); // needed this instead of opacity because of z-index issue
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

export const Submit = ({ children, disabled = false, loading, ...rest }) => (
  <Button disabled={loading || disabled} primary {...rest}>
    {loading && (
      <IconFeedback>
        <FontAwesomeIcon icon={faSyncAlt} />
      </IconFeedback>
    )}
    {children}
  </Button>
);

const LoaderBase = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: row;
  justify-items: center;

  & > svg {
    margin: auto;
    width: 32px !important;
    height: 32px !important;
    animation: ${spin} 2s infinite linear;
  }
`;

export const Loader = () => (
  <LoaderBase>
    <FontAwesomeIcon icon={faSyncAlt} />
  </LoaderBase>
);

const AlertBase = styled.div`
  background-color: ${(props) => props.color};
  color: #fff;
  border-radius: 4px;
  padding: 8px;
  margin-top: 32px;

  & > svg {
    margin: 0 8px;
  }
`;

export const AlertDanger = ({ children }) => {
  return (
    <AlertBase color="#f96e5b">
      <FontAwesomeIcon icon={faTimesCircle} />
      {children}
    </AlertBase>
  );
};

export const AlertInfo = ({ children }) => {
  return (
    <AlertBase color="#3498db">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {children}
    </AlertBase>
  );
};

export const SubTitle = styled.h2`
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: 400;

  & > svg {
    margin-right: 16px;
  }
`;

export const Title = styled.h1`
  font-weight: 400;
  margin-bottom: 32px;
`;

export const Col = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: ${(props) => props.w || '100%'};
  }
`;

export const Col2 = ({ w, children, ...rest }) => (
  <Col w="50%" {...rest}>
    {children}
  </Col>
);

export const Row = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 32px;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    & > * + * {
      margin-left: 32px;
      margin-top: 0;
    }
  }
`;

export const ButtonBar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.maxWidth || 'auto'};

  // expand buttons to fill bar
  & > * {
    min-width: 0;
    width: 100%;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    & > * + * {
      margin-left: 16px;
    }
  }
`;
