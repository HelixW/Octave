import React from 'react';

import Navbar from '../components/Navbar';
import PlayingSection from '../components/PlayingSection';

const MainPage = () => (
  <div className="bg-primary h-full cursor-default overflow-auto">
    <Navbar />
    <div className="mx-32">
      <PlayingSection />
    </div>
  </div>
);

export default MainPage;
