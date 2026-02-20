'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../contexts/AuthContext';
import { faHome, faBookOpen, faBookmark, faSearch, faCog, faQuestionCircle, faSignOutAlt, faBook } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    const pathname = usePathname();
    const { user, logOut } = useAuth();



    return (
        <nav className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__logo">
                    <FontAwesomeIcon icon={faBook} />
                    <h1 className="sidebar__logo--text">Summarist</h1>
                </div>
                <div className="sidebar__links">
                    <Link href="/for-you" className={`sidebar__link ${pathname === '/for-you' ? 'sidebar__link--active' : ''}`}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>For you</span>
                    </Link>
                    <Link href="/my-library" className={`sidebar__link ${pathname === '/my-library' ? 'sidebar__link--active' : ''}`}>
                        <FontAwesomeIcon icon={faBookOpen} />
                        <span>My Library</span>
                    </Link>
                    <Link href="/highlights" className={`sidebar__link ${pathname === '/highlights' ? 'sidebar__link--active' : ''}`}>
                        <FontAwesomeIcon icon={faBookmark} />
                        <span>Highlights</span>
                    </Link>
                    <Link href="/search" className={`sidebar__link ${pathname === '/search' ? 'sidebar__link--active' : ''}`}>
                        <FontAwesomeIcon icon={faSearch} />
                        <span>Search</span>
                    </Link>
                </div>
            </div>
            {user && (
                <div className="sidebar__footer">
                    <Link href="/settings" className={`sidebar__link ${pathname === '/settings' ? 'sidebar__link--active' : ''}`}>
                        <FontAwesomeIcon icon={faCog} />
                        <span>Settings</span>
                    </Link>
                    <Link href="/help" className="sidebar__link">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                        <span>Help & Support</span>
                    </Link>
                    <button onClick={logOut} className="sidebar__link">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default SideBar;
