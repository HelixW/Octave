import React from 'react';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';

const QueueSection = () => (
  <section className="mt-5 pl-10">
    <SectionHeader>Queue</SectionHeader>
    <div className="overflow-y-scroll h-128">
      <SongCard styles="mb-1" />
      <SongCard styles="mb-1" />
      <SongCard styles="mb-1" />
      <SongCard styles="mb-1" />
      <SongCard styles="mb-1" />
      <SongCard styles="mb-1" />
    </div>
  </section>
);

export default QueueSection;
