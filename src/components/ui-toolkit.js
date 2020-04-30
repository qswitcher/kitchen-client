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
