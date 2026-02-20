'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import SideBar from './SideBar';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const appPaths = ['/for-you', '/book', '/player', '/settings', '/my-library', '/highlights'];
  const isAppPage = appPaths.some(path => pathname && pathname.startsWith(path));

  if (isAppPage) {
    return (
      <div className="app-layout">
        <SideBar />
        <Header />
        <main className="app-content">
          {children}
        </main>
      </div>
    );
  }

  return <>{children}</>;
};

export default LayoutWrapper;
