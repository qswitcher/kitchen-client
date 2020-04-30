import styled from 'styled-components';

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
