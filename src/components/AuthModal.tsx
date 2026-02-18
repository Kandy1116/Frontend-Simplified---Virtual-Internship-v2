'use client';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';
import { FaUserAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const AuthModal: React.FC = () => {
  const { isModalOpen, closeModal, signUp, logIn, googleLogin, guestLogin, forgotPassword } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleAuthError = (err: any) => {
    setMessage('');
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/email-already-in-use':
          setError('An account already exists with this email.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
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
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      await googleLogin();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleGuestLogin = async () => {
    setError('');
    setMessage('');
    try {
      await guestLogin();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handlePasswordReset = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    try {
      await forgotPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      handleAuthError(err);
    }
  };

  const switchView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginView(!isLoginView);
    setError('');
    setMessage('');
    setEmail('');
    setPassword('');
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="modal__container"
      overlayClassName="modal"
    >
      <div className="modal__header">
        <h2 className="modal__title">{isLoginView ? 'Log in to Summarist' : 'Sign up to Summarist'}</h2>
        <button className="modal__close" onClick={closeModal}>
          <MdClose />
        </button>
      </div>

      <div className="modal__body">
        {error && <p className="modal__error">{error}</p>}
        {message && <p className="modal__message">{message}</p>}

        {isLoginView ? (
          <>
            <button className="modal__btn modal__btn--guest" onClick={handleGuestLogin}>
              <FaUserAlt />
              <span>Login as a Guest</span>
            </button>
            <div className="modal__separator">
              <span>or</span>
            </div>
            <button className="modal__btn modal__btn--google" onClick={handleGoogleLogin}>
              <img src="/assets/google.png" alt="Google logo" className="modal__btn--logo"/>
              <span>Login with Google</span>
            </button>
            <div className="modal__separator">
              <span>or</span>
            </div>
          </>
        ) : (
          <div className="modal__separator">
            <span>or</span>
          </div>
        )}

        <form className="modal__form" onSubmit={handleEmailPasswordSubmit}>
          <input
            type="email"
            className="modal__input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="modal__btn modal__btn--login">
            <span>{isLoginView ? 'Login' : 'Sign up'}</span>
          </button>
        </form>

        {isLoginView && (
          <a href="#" onClick={handlePasswordReset} className="modal__forgot-password">
            Forgot your password?
          </a>
        )}
      </div>

      <div className="modal__footer">
        {isLoginView ? (
          <p>
            Don't have an account? <a href="#" onClick={switchView}>Sign up</a>
          </p>
        ) : (
          <p>
            Already have an account? <a href="#" onClick={switchView}>Log in</a>
          </p>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
