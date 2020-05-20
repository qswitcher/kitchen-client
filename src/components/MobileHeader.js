import React, { useState } from 'react';
import Burger from './Burger';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Logo />
      <Menu open={open} setOpen={setOpen} />
      <FontAwesomeIcon icon={faSearch} size="2x" />
    </>
  );
}
