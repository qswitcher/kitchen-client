import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const MainContent = styled.div`
  max-width: 100%;

  @media (min-width: 768px) {
    margin: 16px auto;
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const Layout = ({ children }) => (
  <div>
    <Header />
    <MainContent>{children}</MainContent>
  </div>
);

export default Layout;
