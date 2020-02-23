import React from 'react';
import PropTypes from 'prop-types';

const SongCard = props => {
  const { styles, songInfo } = props;
  console.log(songInfo);
  return (
    <div className={`bg-faded px-12 py-6 shadow-lg ${styles}`}>
      <div className="text-white song-title text-2xl">{songInfo.title}</div>
      <div className="text-faded text-xl">{songInfo.artist}</div>
    </div>
  );
};

export default SongCard;

SongCard.propTypes = {
  styles: PropTypes.string,
  songInfo: PropTypes.objectOf(PropTypes.any)
};

SongCard.defaultProps = {
  styles: '',
  songInfo: {}
};
