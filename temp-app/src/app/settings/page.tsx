'use client';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SideBar from '../../components/SideBar';
import Link from 'next/link';

const SettingsPage = () => {
  const { user, openModal } = useAuth();

  return (
    <div className="authenticated-layout">
      <SideBar />
      <main className="main-content">
        <div className="settings-page__container">
          <h1 className="settings-page__title">Settings</h1>
          {user ? (
            <div className="settings-page__content">
              <div className="settings-page__section">
                <h2 className="settings-page__section-title">Your Subscription plan</h2>
                <div className="settings-page__plan-details">
                  {/* This will be dynamic based on user's subscription status in the future */}
                  <p className="settings-page__plan-name">Basic</p>
                  <Link href="/choose-plan" className="settings-page__upgrade-btn">
                    Upgrade
                  </Link>
                </div>
              </div>
              <div className="settings-page__section">
                <h2 className="settings-page__section-title">Email</h2>
                <p className="settings-page__user-email">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="settings-page__logged-out">
                <figure className="settings-page__logged-out--img__wrapper">
                    <img src="/assets/login.png" alt="Login to view settings" />
                </figure>
              <h2 className="settings-page__logged-out--title">Log in to your account to see your details.</h2>
              <button className="settings-page__logged-out--btn" onClick={openModal}>
                Login
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
