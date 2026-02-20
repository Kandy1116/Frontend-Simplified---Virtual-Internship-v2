"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { FiHome, FiBookmark, FiEdit, FiSearch, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/for-you", icon: <FiHome />, text: "For you" },
    { href: "/my-library", icon: <FiBookmark />, text: "My Library" },
    { href: "/highlights", icon: <FiEdit />, text: "Highlights" },
    { href: "/search", icon: <FiSearch />, text: "Search" },
  ];

  return (
    <nav className="sidebar">
      <Link href="/" className="sidebar__logo">
        Summarist
      </Link>
      <div className="sidebar__nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar__link ${pathname === link.href ? "sidebar__link--active" : ""}`}>
            {link.icon}
            <span>{link.text}</span>
          </Link>
        ))}
      </div>
      <div className="sidebar__user-links">
        <Link href="/settings" className={`sidebar__link ${pathname === "/settings" ? "sidebar__link--active" : ""}`}>
          <FiSettings />
          <span>Settings</span>
        </Link>
        <Link href="/help" className={`sidebar__link ${pathname === "/help" ? "sidebar__link--active" : ""}`}>
          <FiHelpCircle />
          <span>Help & Support</span>
        </Link>
        <button onClick={logout} className="sidebar__link">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
