import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

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

export const Submit = styled.input`
  background-color: #6ba72b;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-top: 16px;
  min-width: 160px;
`;

export const Button = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  margin-top: 16px;
  min-width: 160px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #fff;
    background-color: #6ba72b;
  }
`;
