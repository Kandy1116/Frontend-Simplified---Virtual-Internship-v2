"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Nav = () => {
  const { user, openModal, logOut } = useAuth();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/assets/logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">

          <li className="nav__list nav__list--login" onClick={openModal}>
            Login
          </li>
          <li className="nav__list">
            About
          </li>
          <li className="nav__list">
            Contact
          </li>
          <li className="nav__list">
            Help
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
