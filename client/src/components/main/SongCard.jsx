import React from 'react';
import PropTypes from 'prop-types';

const SongCard = ({ styles }) => (
  <div className={`bg-faded px-12 py-6 shadow-lg ${styles}`}>
    <div className="text-white song-title text-2xl">Yummy</div>
    <div className="text-faded text-xl">Justin Bieber</div>
  </div>
);

export default SongCard;

SongCard.propTypes = {
  styles: PropTypes.string
};

SongCard.defaultProps = {
  styles: ''
};
