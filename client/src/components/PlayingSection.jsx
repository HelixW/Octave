import React from 'react';

import SectionHeader from './SectionHeader';
import PlayingCard from './PlayingCard';

const PlayingSection = () => (
  <aside className="w-5/12 pr-10 mt-5">
    <SectionHeader>Now Playing</SectionHeader>
    <PlayingCard />
  </aside>
);

export default PlayingSection;
