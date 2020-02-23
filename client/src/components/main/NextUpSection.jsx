import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';

const NextUpSection = props => {
  const { nextUp } = props;
  return (
    <div className="mt-5 pl-10">
      <SectionHeader>Next Up</SectionHeader>
      <SongCard songInfo={nextUp} />
    </div>
  );
};

export default NextUpSection;

NextUpSection.propTypes = {
  nextUp: PropTypes.objectOf(PropTypes.any)
};

NextUpSection.defaultProps = {
  nextUp: {}
};
