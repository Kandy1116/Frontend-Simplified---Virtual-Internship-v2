'use client';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaUser, FaTimes } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signUp, logIn, googleLogin, guestLogin, forgotPassword } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleAuthError = (error: any) => {
    if (error.code === 'auth/user-not-found') {
      setError('User not found. Please check your email or sign up.');
    } else if (error.code === 'auth/wrong-password') {
      setError('Invalid password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      setError('Please enter a valid email address.');
    } else if (error.code === 'auth/weak-password') {
      setError('Password should be at least 6 characters.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (isLoginView) {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      onClose();
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await guestLogin();
      onClose();
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    try {
      await forgotPassword(email);
      setMessage('A password reset link has been sent to your email.');
      setError('');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const switchView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setMessage('');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="auth-modal__container" overlayClassName="auth-modal">
      <div className="auth-modal__header">
        <h2 className="auth-modal__title">
          {isLoginView ? 'Log in to Summarist' : 'Sign up to Summarist'}
        </h2>
        <button onClick={onClose} className="auth-modal__close-btn">
          <FaTimes />
        </button>
      </div>
      <div className="auth-modal__body">
        {error && <p className="auth-modal__error">{error}</p>}
        {message && <p className="auth-modal__message">{message}</p>}
        
        {isLoginView ? (
          <>
            <button className="auth-modal__btn auth-modal__btn--guest" onClick={handleGuestLogin}>
              <FaUser className="auth-modal__btn-icon" />
              <span>Login as a Guest</span>
            </button>
            <div className="auth-modal__separator">
              <span className="auth-modal__separator-text">or</span>
            </div>
            <button className="auth-modal__btn auth-modal__btn--google" onClick={handleGoogleLogin}>
              <FaGoogle className="auth-modal__btn-icon" />
              <span>Login with Google</span>
            </button>
          </>
        ) : (
          <button className="auth-modal__btn auth-modal__btn--google" onClick={handleGoogleLogin}>
            <FaGoogle className="auth-modal__btn-icon" />
            <span>Sign up with Google</span>
          </button>
        )}

        <div className="auth-modal__separator">
          <span className="auth-modal__separator-text">or</span>
        </div>

        <form onSubmit={handleEmailPasswordSubmit} className="auth-modal__form">
          <div className="auth-modal__input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-modal__input"
            />
          </div>
          <div className="auth-modal__input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-modal__input"
            />
          </div>
          <button type="submit" className="auth-modal__btn auth-modal__btn--primary">
            {isLoginView ? 'Login' : 'Sign up'}
          </button>
        </form>

        {isLoginView && (
          <a onClick={handlePasswordReset} className="auth-modal__link auth-modal__link--forgot">
            Forgot your password?
          </a>
        )}
      </div>
      <div className="auth-modal__footer">
        <a onClick={switchView} className="auth-modal__link">
          {isLoginView ? "Don't have an account?" : 'Already have an account?'}
        </a>
      </div>
    </Modal>
  );
};

export default AuthModal;
