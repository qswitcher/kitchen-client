import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/app-context';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export const StyledMenu = styled.nav`
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  background: #fff;
  height: 100vh;
  text-align: left;
  padding: 64px 32px;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const NavItem = styled.div`
  margin: 16px 0;

  & > a {
    text-decoration: none;
    color: inherit;

    font-size: 32px;
    // text-transform: uppercase;
    // padding: 2rem 0;
    // font-weight: bold;
    // letter-spacing: 0.5rem;
    // color: #0d0c1d;
    // text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      //   font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

const Menu = ({ open }) => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push('/recipes');
  };
  return (
    <StyledMenu open={open}>
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
    </StyledMenu>
  );
};
export default Menu;
