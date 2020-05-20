import React from 'react';
import styled from 'styled-components';
import useViewport from '../hooks/viewport';

const LogoStyled = styled.div`
  color: #6ba72b;
  font-family: 'Cedarville Cursive', cursive;
  font-size: 40px;
  font-weight: 500;

  @media (min-width: 768px) {
    width: 100%;
    font-size: 32px;
  }
`;

export default function Logo() {
  const { width } = useViewport();
  const breakpoint = 768;

  return (
    <LogoStyled>{width > breakpoint ? 'Russom Kitchen' : 'RK'}</LogoStyled>
  );
}
