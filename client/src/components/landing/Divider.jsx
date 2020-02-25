import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ height, styles }) => (
  <svg
    width="100"
    height={height}
    viewBox="0 0 3 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles}
  >
    <line
      x1="1.5"
      y1="6.55671e-08"
      x2="1.49998"
      y2="420"
      stroke="#86CCAC"
      strokeWidth="3"
    />
  </svg>
);

export default Divider;

Divider.propTypes = {
  height: PropTypes.string,
  styles: PropTypes.string
};

Divider.defaultProps = {
  height: '',
  styles: ''
};
