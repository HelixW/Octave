import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as EmptyHeart } from '../../icons/EmptyHeart.svg';
import { ReactComponent as FilledHeart } from '../../icons/FilledHeart.svg';

const SongCard = props => {
  const { styles, songInfo, upVotedSong, handleUpVote } = props;

  const heart = songInfo.id === upVotedSong ? <FilledHeart /> : <EmptyHeart />;

  const handleLike = () => {
    handleUpVote(songInfo.id === upVotedSong ? -1 : songInfo.id);
  };

  if (typeof songInfo.upVotes === 'undefined') {
    return (
      <div
        className={`bg-faded px-12 py-6 shadow-lg flex justify-between items-center ${styles}`}
      >
        <div>
          <div className="text-white song-title text-2xl">{songInfo.title}</div>
          <div className="text-faded text-xl">{songInfo.artist}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`bg-faded px-12 py-6 shadow-lg flex justify-between items-center ${styles}`}
    >
      <div>
        <div className="text-white song-title text-2xl">{songInfo.title}</div>
        <div className="text-faded text-xl">{songInfo.artist}</div>
      </div>
      <div className="flex text-2xl text-contrast">
        <div>{songInfo.upVotes}</div>
        <div
          className="ml-4 cursor-pointer focus:outline-none"
          role="button"
          tabIndex={0}
          onClick={handleLike}
        >
          {heart}
        </div>
      </div>
    </div>
  );
};

export default SongCard;

SongCard.propTypes = {
  styles: PropTypes.string,
  songInfo: PropTypes.objectOf(PropTypes.any),
  upVotedSong: PropTypes.number
};

SongCard.defaultProps = {
  styles: '',
  songInfo: {},
  upVotedSong: -1
};
