import React from 'react';
import PropTypes from 'prop-types';

const SearchCard = props => {
  const { songInfo, queue, handleClick } = props;

  return (
    <div
      className="p-4 bg-faded mb-1 hover:bg-transparent cursor-pointer focus:outline-none"
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl text-white">{songInfo.title}</div>
          <div className="text-base text-faded">
            {songInfo.artists.join(', ')}
          </div>
        </div>
        <div
          className={
            queue.some(song => song.id === songInfo.id)
              ? 'text-contrast text-xl'
              : 'text-contrast opacity-0 text-xl'
          }
        >
          Already in queue
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

SearchCard.propTypes = {
  songInfo: PropTypes.objectOf(PropTypes.any),
  queue: PropTypes.arrayOf(PropTypes.any)
};

SearchCard.defaultProps = {
  songInfo: {},
  queue: []
};
