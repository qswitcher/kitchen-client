import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBase = styled.nav`
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.03);
  background: #ffffff;
  margin: 0;
  padding: 16px;

  & > ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }
`;

const Nav = ({ children }) => (
  <NavBase>
    <ul>{children}</ul>
  </NavBase>
);

const NavItem = styled.li`
  margin-right: 16px;
  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = () => (
  <header>
    <Nav>
      <NavItem>
        <Link to="/recipes">Recipes</Link>
      </NavItem>
      <NavItem>
        <Link to="/create-recipe">Add Recipe</Link>
      </NavItem>
    </Nav>
  </header>
);

export default Header;
