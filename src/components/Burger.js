import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px 16px;
  z-index: 10;
  cursor: pointer;
  min-height: 48px;

  &:focus {
    outline: none;
  }
`;

export const StyledBurger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  padding: 0;

  div {
    width: 1.5rem;
    height: 0.15rem;
    background: #676767;
    border-radius: 4px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <Button onClick={() => setOpen(!open)}>
      <StyledBurger open={open}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </Button>
  );
};

export default Burger;
