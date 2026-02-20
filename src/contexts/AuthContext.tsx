'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import app from '../firebase';
import AuthModal from '../components/AuthModal';

if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

interface AuthContextType {
  user: firebase.User | null;
  auth: firebase.auth.Auth | null;
  isSubscribed: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  signUp: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logOut: () => Promise<void>;
  googleLogin: () => Promise<firebase.auth.UserCredential>;
  guestLogin: () => Promise<firebase.auth.UserCredential>;
  forgotPassword: (email: string) => Promise<void>;
  library: string[];
  toggleLibrary: (bookId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<firebase.auth.Auth | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Placeholder
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [library, setLibrary] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setAuth(app.auth());
  }, []);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const toggleLibrary = (bookId: string) => {
    setLibrary((prevLibrary) =>
      prevLibrary.includes(bookId)
        ? prevLibrary.filter((id) => id !== bookId)
        : [...prevLibrary, bookId]
    );
  };

  const handleAuthSuccess = () => {
    closeModal();
    router.push('/for-you');
  };

  const handleLogoutSuccess = () => {
    router.push('/');
  };

  const signUp = (email: string, password: string) => {
    if (!auth) return Promise.reject(new Error('Auth service not available'));
    return auth.createUserWithEmailAndPassword(email, password).then(res => {
      handleAuthSuccess();
      return res;
    });
  };

  const logIn = (email: string, password: string) => {
    if (!auth) return Promise.reject(new Error('Auth service not available'));
    return auth.signInWithEmailAndPassword(email, password).then(res => {
      handleAuthSuccess();
      return res;
    });
  };

  const googleLogin = () => {
    if (!auth) return Promise.reject(new Error('Auth service not available'));
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider).then(res => {
      handleAuthSuccess();
      return res;
    });
  };

  const guestLogin = () => {
    if (!auth) return Promise.reject(new Error('Auth service not available'));
    return auth.signInWithEmailAndPassword('guest@gmail.com', 'guest123')
      .catch((error) => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          // If the guest user does not exist, create it.
          return auth.createUserWithEmailAndPassword('guest@gmail.com', 'guest123');
        }
        throw error;
      })
      .then(res => {
        handleAuthSuccess();
        return res;
      });
  };

  const forgotPassword = (email: string) => {
    if (!auth) return Promise.reject(new Error('Auth service not available'));
    return auth.sendPasswordResetEmail(email);
  };

  const logOut = () => {
    if (!auth) return Promise.reject(new Error('Auth service not available'));
    return auth.signOut().then(() => {
      handleLogoutSuccess();
    });
  };

  const value = useMemo(() => ({
    user,
    auth,
    isSubscribed,
    isModalOpen,
    openModal,
    closeModal,
    signUp,
    logIn,
    logOut,
    googleLogin,
    guestLogin,
    forgotPassword,
    library,
    toggleLibrary,
  }), [user, auth, isSubscribed, isModalOpen, library]);

  if (!auth) {
    return null; // Or a loading spinner, so children don't render without auth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
