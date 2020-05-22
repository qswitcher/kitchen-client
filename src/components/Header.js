import React from 'react';
import styled from 'styled-components';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import useViewport from '../hooks/viewport';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.03);
  background: #ffffff;
  margin: 0;
  position: sticky;
  top: 0;

  @media (min-width: 768px) {
    padding: 16px;
  }
`;

const Header = () => {
  const { width } = useViewport();
  const breakpoint = 768;

  return (
    <HeaderWrapper>
      {width > breakpoint ? <DesktopHeader /> : <MobileHeader />}
    </HeaderWrapper>
  );
};

export default Header;
