import "../app/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
// The main App component now simply wraps everything in the AuthProvider.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
