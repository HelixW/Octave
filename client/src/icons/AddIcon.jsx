import React from 'react';
import PropTypes from 'prop-types';

const AddIcon = ({ height }) => (
  <svg
    height={height}
    viewBox="0 0 79 79"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask1"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="79"
      height="79"
    >
      <path d="M47.4 11.8501H0V19.7502H47.4V11.8501Z" fill="black" />
      <path d="M47.4 27.6499H0V35.55H47.4V27.6499Z" fill="black" />
      <path d="M31.6 43.4502H0V51.3503H31.6V43.4502Z" fill="black" />
      <path
        d="M63.1999 43.45V27.6499H55.3001V43.45H39.4999V51.3499H55.3001V67.15H63.1999V51.3499H79V43.45H63.1999Z"
        fill="black"
      />
    </mask>
    <g mask="url(#mask1)">
      <rect x="-91" y="-91" width="294" height="268" fill="#86CCAC" />
    </g>
  </svg>
);

export default AddIcon;

AddIcon.propTypes = {
  height: PropTypes.string
};

AddIcon.defaultProps = {
  height: ''
};
