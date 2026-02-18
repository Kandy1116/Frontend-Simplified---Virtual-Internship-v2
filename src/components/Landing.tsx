"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { openModal } = useAuth();

  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people, individuals who barely have time to read, and even people who don't like to read.
              </div>
              <button className="btn home__cta--btn" onClick={openModal}>
                Login
              </button>
            </div>
            <figure className="landing__image--mask">
              <img src="/assets/landing.png" alt="landing" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
