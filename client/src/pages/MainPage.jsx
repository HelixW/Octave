import React from 'react';

import Navbar from '../components/Navbar';
import PlayingSection from '../components/PlayingSection';
import NextUpSection from '../components/NextUpSection';
import QueueSection from '../components/QueueSection';

const MainPage = () => (
  <div className="bg-primary h-full cursor-default overflow-auto">
    <Navbar />
    <div className="mx-32 flex">
      <PlayingSection />
      <div className="w-7/12 flex flex-col">
        <NextUpSection />
        <QueueSection />
      </div>
    </div>
  </div>
);

export default MainPage;
