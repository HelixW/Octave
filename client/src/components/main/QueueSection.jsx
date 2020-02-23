import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';
import SearchBox from './SearchBox';

const QueueSection = ({ queue }) => (
  <section className="mt-5 pl-10">
    <div className="flex justify-between">
      <SectionHeader>Queue</SectionHeader>
      <SearchBox />
    </div>
    <div className="overflow-y-scroll h-128">
      {queue.map(songInfo => (
        <SongCard styles="mb-1" songInfo={songInfo} />
      ))}
    </div>
  </section>
);

export default QueueSection;

QueueSection.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.any)
};

QueueSection.defaultProps = {
  queue: []
};
