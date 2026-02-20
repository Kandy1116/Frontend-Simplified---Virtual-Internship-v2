'use client';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';
import { MdClose } from 'react-icons/md';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signUp, logIn, googleLogin, guestLogin, forgotPassword } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await logIn(email, password);
      onClose();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signUp(email, password); // Assuming direct signup, adjust if flow changes
      onClose();
    } catch (err) {
      handleAuthError(err);
    }
  };


  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      await googleLogin();
      onClose();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleGuestLogin = async () => {
    setError('');
    setMessage('');
    try {
      await guestLogin();
      onClose();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }
    try {
      await forgotPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      handleAuthError(err);
    }
  };
  
  const handleClose = () => {
    setError('');
    setMessage('');
    setEmail('');
    setPassword('');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="auth-modal__container"
      overlayClassName="auth-modal"
      ariaHideApp={false}
    >
      <div className="auth-modal__header">
        <div className="auth-modal__tabs">
          <button 
            className={`auth-modal__tab ${activeTab === 'login' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`auth-modal__tab ${activeTab === 'signup' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign up
          </button>
        </div>
        <button className="auth-modal__close-btn" onClick={handleClose}>
          <MdClose />
        </button>
      </div>
      <div className="auth-modal__body">
        {error && <p className="auth-modal__error">{error}</p>}
        {message && <p className="auth-modal__message">{message}</p>}

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-modal__form">
            <div className="auth-modal__input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="auth-modal__input-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <span onClick={handlePasswordReset} className="auth-modal__forgot-password">Forgot your password?</span>
            <button type="submit" className="auth-modal__btn auth-modal__btn--primary">
              Login
            </button>
            <div className="auth-modal__separator"><span>or</span></div>
            <button type="button" onClick={handleGuestLogin} className="auth-modal__btn auth-modal__btn--secondary">
              Login as a guest
            </button>
            <button type="button" onClick={handleGoogleLogin} className="auth-modal__btn auth-modal__btn--google">
                <img src="/assets/google.png" alt="Google logo"/>
                Continue with Google
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="auth-modal__form">
             <div className="auth-modal__input-group">
                <label>Email Address</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
             </div>
             <button type="submit" className="auth-modal__btn auth-modal__btn--primary">
              Sign up with email
            </button>
            <div className="auth-modal__separator"><span>or</span></div>
            <button type="button" onClick={handleGoogleLogin} className="auth-modal__btn auth-modal__btn--google">
                <img src="/assets/google.png" alt="Google logo"/>
                Continue with Google
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
