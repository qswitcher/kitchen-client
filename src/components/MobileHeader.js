import React, { useState, useEffect } from 'react';
import Burger from './Burger';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { Link } from './ui-toolkit';
import { useLocation } from 'react-router-dom';

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  let location = useLocation();
  useEffect(() => {
    // close the menu on route chagnes
    setOpen(false);
  }, [location]);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Link to="/recipes">
        <Logo />
      </Link>
      <Menu open={open} setOpen={setOpen} />
      <FontAwesomeIcon icon={faSearch} size="lg" />
    </>
  );
}