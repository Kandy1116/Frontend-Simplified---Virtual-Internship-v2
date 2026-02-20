'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <header className="header">

            <SearchBar />
            {user ? (
                <div className="header__user-actions">
                    <button onClick={logOut} className="header__logout">
                        <FontAwesomeIcon icon={faCog} className="header__logout--icon" />
                        Logout
                    </button>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
