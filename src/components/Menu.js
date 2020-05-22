import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/app-context';
import { Link } from 'react-router-dom';

export const StyledMenu = styled.nav`
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
    width: 250px;
  }
`;

const NavItem = styled.div`
  margin: 16px 0;

  & > a {
    text-decoration: none;
    color: inherit;

    font-size: 32px;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  transform: scale(${({ open }) => (open ? '1' : '0')});
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: opacity 400ms ease, transform 0s ease;
`;

const Menu = ({ open, setOpen }) => {
  const { isAuthenticated, logout } = useAppContext();

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [open]);
  return (
    <>
      <Overlay open={open} onClick={() => open && setOpen(false)} />
      <StyledMenu open={open}>
        <NavItem>
          <Link to="/">Recipes</Link>
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
            <Link to="/recipes" onClick={logout}>
              Logout
            </Link>
          </NavItem>
        )}
      </StyledMenu>
    </>
  );
};
export default Menu;
