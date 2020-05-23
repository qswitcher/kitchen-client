import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryParams } from '../hooks/url-hooks';
import { useInputs } from '../hooks/input-hooks';

const ButtonStyled = styled.button`
  padding: 8px 16px;
  min-height: 48px;
  background-color: #fff;
  border: none;

  & > svg {
    color: #676767;
  }
`;

const StyledClose = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1em;
  height: 1em;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 16px;

  div {
    width: 1.414em;
    height: 0.1em;
    margin: -0.05em;
    background: #676767;
    border-radius: 4px;
    position: relative;
    transform-origin: center;

    :first-child {
      transform: rotate(45deg);
    }

    :nth-child(2) {
      transform: rotate(-45deg);
    }
  }
`;

const CloseIcon = (props) => {
  return (
    <StyledClose {...props}>
      <div />
      <div />
    </StyledClose>
  );
};

export const SearchModal = styled.nav`
  overflow: auto;
  background: #fff;
  height: 100vh;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ open }) => (open ? '1' : '0')};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
  transition: all 0.3s ease-in-out;
  z-index: 10000;
  width: 100%;
`;

const ModalHeader = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row-reverse;
  min-height: 48px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 4px;
  border: none;
  color: #676767;
  height: 48px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
  border-bottom: 2px solid #eee;
`;

const IconWrapper = styled.div`
  padding: 8px;
`;

const MobileSearchForm = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const params = useQueryParams();
  const { bind, values } = useInputs({
    q: params.q || '',
  });

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      history.push({
        pathname: '/recipes',
        search: `?q=${values.q}`,
      });
    }
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [open]);

  useEffect(() => {
    // close the menu on route chagnes
    setOpen(false);
  }, [location]);

  return (
    <>
      <SearchModal open={open}>
        <ModalHeader>
          <CloseIcon onClick={() => setOpen(false)} />
        </ModalHeader>
        <Row>
          <IconWrapper>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </IconWrapper>
          <Input
            onKeyPress={onKeyPress}
            type="text"
            {...bind.q}
            placeholder="Search recipes"
          />
        </Row>
      </SearchModal>
      <ButtonStyled onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </ButtonStyled>
    </>
  );
};

export default MobileSearchForm;
