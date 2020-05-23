import React, { useState, useEffect } from 'react';
import Burger from './Burger';
import Menu from './Menu';
import Logo from './Logo';
import { Link } from './ui-toolkit';
import { useLocation } from 'react-router-dom';
import MobileSearchForm from './MobileSearchForm';

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
      <MobileSearchForm />
      <Menu open={open} setOpen={setOpen} />
    </>
  );
}
