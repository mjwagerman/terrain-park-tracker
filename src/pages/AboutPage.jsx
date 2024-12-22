import React from 'react';
import Header from '../components/Header';
import MWSKI from '../assets/MWSKI.jpg';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <div className="about-container">
        <div className="about-text-content">
          <h1>About</h1>
          <p>This website is built by a skier for skiers. Aims to bring all the information needed about terrain parks
            into one place.
            Personal project developed front to back by Mathew Wagerman.</p>
          <a href="https://github.com/mjwagerman" target="_blank" rel="noopener noreferrer">
            github.com/mjwagerman/
          </a>
        </div>
        <div className="about-image-content">
          <img src={MWSKI} alt="Mathew Wagerman" />
        </div>
      </div>
    </div>
  );
}