"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Cta = () => {
  const { openModal } = useAuth();

  return (
    <section id="cta">
      <div className="row">
          <button className="btn home__cta--btn" onClick={openModal}>Login</button>
        </div>
    </section>
  );
};

export default Cta;
