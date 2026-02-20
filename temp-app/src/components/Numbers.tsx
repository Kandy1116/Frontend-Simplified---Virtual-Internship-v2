"use client";
import React from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

const Numbers = () => {
  return (
    <section id="numbers">
      <div className="container">
        <div className="row">
          <h2 className="section__title">Start growing with Summarist now</h2>
          <div className="numbers__wrapper">
            <div className="numbers">
              <div className="numbers__icon">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.219 3.375 8 7.399 4.781 3.375A1.002 1.002 0 0 0 3 4v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V4a1.002 1.002 0 0 0-1.781-.625L16 7.399l-3.219-4.024c-.381-.474-1.181-.474-1.562 0zM5 19v-2h14.001v2H5zm10.219-9.375c.381.475 1.182.475 1.563 0L19 6.851 19.001 15H5V6.851l2.219 2.774c.381.475 1.182.475 1.563 0L12 5.601l3.219 4.024z"></path>
                </svg>
              </div>
              <h3 className="numbers__title">3 Million</h3>
              <p className="numbers__sub--title">Downloads on all platforms</p>
            </div>
            <div className="numbers">
              <div className="numbers__icon numbers__icon--star">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
              </div>
              <h3 className="numbers__title">4.5 Stars</h3>
              <p className="numbers__sub--title">Average ratings on iOS and Google Play</p>
            </div>
            <div className="numbers">
              <div className="numbers__icon">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0H24V24H0z"></path>
                    <path d="M21 3v2c0 9.627-5.373 14-12 14H5.243C5.08 19.912 5 20.907 5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0zm-8 2c-4.418 0-8 3.582-8 8 0 .362.003.711.01 1.046 1.254-1.978 3.091-3.541 5.494-4.914l.992 1.736C8.641 12.5 6.747 14.354 5.776 17H9c6.015 0 9.871-3.973 9.997-11.612-1.372.133-2.647.048-4.22-.188C13.627 5.027 13.401 5 13 5z"></path>
                  </g>
                </svg>
              </div>
              <h3 className="numbers__title">97%</h3>
              <p className="numbers__sub--title">Of Summarist members create a better reading habit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers;
