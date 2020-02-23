import React from 'react';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';
import SearchBox from './SearchBox';

const QueueSection = () => (
  <section className="mt-5 pl-10">
    <div className="flex justify-between">
      <SectionHeader>Queue</SectionHeader>
      <SearchBox />
    </div>
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
