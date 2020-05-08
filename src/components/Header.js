import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../contexts/app-context';

const Nav = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  list-style-type: none;
`;

const NavItem = styled.li`
  margin-right: 16px;
  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.03);
  background: #ffffff;
  margin: 0;
  padding: 16px;
`;

const Header = () => {
  const history = useHistory();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogout = async () => {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push('/recipes');
  };

  return (
    <HeaderWrapper>
      <Nav>
        <NavItem>
          <Link to="/recipes">Recipes</Link>
        </NavItem>
      </Nav>
      <Nav>
        {isAuthenticated && (
          <NavItem>
            <Link to="/create-recipe">Add Recipe</Link>
          </NavItem>
        )}
        {!isAuthenticated && (
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
        )}
        {isAuthenticated && (
          <NavItem>
            <Link to="/recipes" onClick={handleLogout}>
              Logout
            </Link>
          </NavItem>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
