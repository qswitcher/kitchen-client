import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const MainContent = styled.div`
  height: 100%;
  max-width: 100%;
  margin: auto;
  margin-top: 32px;

  @media (min-width: 768px) {
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
