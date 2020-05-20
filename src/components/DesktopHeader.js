import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../contexts/app-context';
import SearchForm from './SearchForm';
import Logo from './Logo';

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

const DesktopHeader = () => {
  const history = useHistory();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogout = async () => {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push('/recipes');
  };

  return (
    <>
      <Nav>
        <NavItem>
          <Link to="/recipes">
            <Logo />
          </Link>
        </NavItem>
      </Nav>
      <Nav>
        <img src="" />
      </Nav>
      <Nav>
        <NavItem>
          <SearchForm />
        </NavItem>
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
    </>
  );
};

export default DesktopHeader;
