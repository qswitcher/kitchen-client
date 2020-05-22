import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #fff;
  width: 100%;
  z-index: 200;
`;

const Modal = (props) => {
  const el = document.createElement('div');

  useEffect(() => {
    const appRoot = document.getElementById('app-root');
    const modalRoot = document.getElementById('modal-root');
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(props.children, el);
};
