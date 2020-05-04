import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

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

const Header = () => {
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();

    // userHasAuthenticated(false);

    history.push('/recipes');
  };

  return (
    <header>
      <Nav>
        <NavItem>
          <Link to="/recipes">Recipes</Link>
        </NavItem>
        <NavItem>
          <Link to="/create-recipe">Add Recipe</Link>
        </NavItem>
        <NavItem>
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem>
          <Link to="/recipes" onClick={handleLogout}>
            Logout
          </Link>
        </NavItem>
      </Nav>
    </header>
  );
};

export default Header;
