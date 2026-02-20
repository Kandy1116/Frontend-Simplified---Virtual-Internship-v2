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

import { Book } from "../types/Book";

interface AuthContextType {
  user: firebase.User | null;
  loading: boolean;
  auth: firebase.auth.Auth | null;
  isSubscribed: boolean;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeModal: () => void;
  signUp: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logOut: () => Promise<void>;
  googleLogin: () => Promise<firebase.auth.UserCredential>;
  guestLogin: () => Promise<firebase.auth.UserCredential>;
  forgotPassword: (email: string) => Promise<void>;
  library: Book[];
  toggleLibrary: (book: Book) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<firebase.auth.Auth | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false); // Placeholder
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [library, setLibrary] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    setAuth(app.auth());
  }, []);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // A real app would check the user's subscription status from a database
      if (currentUser) {
        // For guest user, give them a subscription for demo purposes
        if (currentUser.email === 'guest@gmail.com') {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } else {
        setIsSubscribed(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const openAuthModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const toggleLibrary = (book: Book) => {
    setLibrary((prevLibrary) =>
      prevLibrary.some((libBook) => libBook.id === book.id)
        ? prevLibrary.filter((libBook) => libBook.id !== book.id)
        : [...prevLibrary, book]
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
    loading,
    auth,
    isSubscribed,
    isModalOpen,
    openAuthModal,
    closeModal,
    signUp,
    logIn,
    logOut,
    googleLogin,
    guestLogin,
    forgotPassword,
    library,
    toggleLibrary,
  }), [user, auth, isSubscribed, isModalOpen, library, loading]);

  if (loading) {
    return null; // Or a loading spinner
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
