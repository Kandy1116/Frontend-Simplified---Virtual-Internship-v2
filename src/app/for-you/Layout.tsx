"use client";
import Sidebar from "./Sidebar";
import SearchBar from "../../components/SearchBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <header className="main-header">
          <SearchBar />
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
