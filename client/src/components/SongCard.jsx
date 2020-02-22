import React from 'react';
import PropTypes from 'prop-types';

const SongCard = ({ styles }) => {
  console.log(styles);
  return (
    <div className={`bg-faded px-12 py-6 ${styles}`}>
      <div className="text-white song-title text-2xl">Yummy</div>
      <div className="text-faded text-xl">Justin Bieber</div>
    </div>
  );
};

export default SongCard;

SongCard.propTypes = {
  styles: PropTypes.string
};

SongCard.defaultProps = {
  styles: ''
};
