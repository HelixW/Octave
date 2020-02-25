import React from 'react';
import PropTypes from 'prop-types';

const PlayingCard = props => {
  const { nowPlaying } = props;
  return (
    <div className="bg-secondary shadow-lg">
      <img
        src={nowPlaying.albumArt}
        alt="Album Art"
        className="w-full p-10 pb-5"
      />
      <div className="mx-10 pb-5">
        <div className="text-white text-4xl song-title">{nowPlaying.title}</div>
        <div className="text-white text-xl text-faded">
          {nowPlaying.artists.join(', ')}
        </div>
      </div>
    </div>
  );
};
export default PlayingCard;

PlayingCard.propTypes = {
  nowPlaying: PropTypes.objectOf(PropTypes.any)
};

PlayingCard.defaultProps = {
  nowPlaying: {}
};
