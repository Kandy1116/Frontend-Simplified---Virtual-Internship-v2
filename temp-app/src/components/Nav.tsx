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

          {user ? (
             <li className="nav__list nav__list--login" onClick={logOut}>
              Logout
            </li>
          ) : (
             <li className="nav__list nav__list--login" onClick={openModal}>
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
