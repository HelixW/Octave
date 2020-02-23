import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ children }) => (
  <header className="text-white section-header text-5xl mb-5">
    {children}
  </header>
);

export default SectionHeader;

SectionHeader.propTypes = {
  children: PropTypes.string
};

SectionHeader.defaultProps = {
  children: ''
};
