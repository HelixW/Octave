import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import PlayingCard from './PlayingCard';

const PlayingSection = props => {
  const { nowPlaying } = props;
  return (
    <aside className="w-5/12 pr-10 mt-5">
      <SectionHeader>Now Playing</SectionHeader>
      <PlayingCard nowPlaying={nowPlaying} />
    </aside>
  );
};

export default PlayingSection;

PlayingSection.propTypes = {
  nowPlaying: PropTypes.objectOf(PropTypes.any)
};

PlayingSection.defaultProps = {
  nowPlaying: {}
};
