import React from 'react';
import Nav from '../components/Nav';
import Landing from '../components/Landing';
import Features from '../components/Features';
import Statistics from '../components/Statistics';
import Numbers from '../components/Numbers';
import Highlights from '../components/Highlights';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Landing />
      <main>
        <Features />
        <Statistics />
        <Highlights />
        <Cta />
        <Numbers />
      </main>
      <Footer />
    </>
  );
}
