import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';
import SearchBox from './SearchBox';

const QueueSection = props => {
  let { queue } = props;
  const { upVotedSong, handleUpVote } = props;

  queue = queue.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));

  return (
    <section className="mt-5 pl-10">
      <div className="flex justify-between">
        <SectionHeader>Queue</SectionHeader>
        <SearchBox />
      </div>
      <div className="overflow-y-scroll h-queue">
        {queue.map(songInfo => (
          <SongCard
            styles="mb-1"
            songInfo={songInfo}
            key={songInfo.id}
            upVotedSong={upVotedSong}
            handleUpVote={handleUpVote}
          />
        ))}
      </div>
    </section>
  );
};
export default QueueSection;

QueueSection.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.any),
  upVotedSong: PropTypes.number
};

QueueSection.defaultProps = {
  queue: [],
  upVotedSong: -1
};
