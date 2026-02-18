import "../app/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <AppContent
        Component={Component}
        pageProps={pageProps}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />
    </AuthProvider>
  );
}

function AppContent({ Component, pageProps, openAuthModal }: { Component: any, pageProps: any, openAuthModal: () => void }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && router.pathname === "/") {
      router.push("/for-you");
    }
    if (!user && router.pathname === "/for-you") {
      router.push("/");
    }
  }, [user, router]);

  return <Component {...pageProps} openAuthModal={openAuthModal} />;
}

export default MyApp;
