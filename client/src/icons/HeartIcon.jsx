import React from 'react';
import PropTypes from 'prop-types';

const HeartIcon = ({ height }) => (
  <svg
    height={height}
    viewBox="0 0 60 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="60"
      height="54"
    >
      <path
        d="M55.6223 5.20711C52.663 1.84922 48.5576 0 44.0625 0C37.7405 0 33.7379 3.77578 31.4936 6.94336C30.9112 7.76531 30.4159 8.58949 30 9.36504C29.5841 8.58949 29.0889 7.76531 28.5064 6.94336C26.2621 3.77578 22.2595 0 15.9375 0C11.4424 0 7.33699 1.84934 4.37754 5.20723C1.55473 8.41043 0 12.7004 0 17.2869C0 22.2795 1.94918 26.923 6.13418 31.9002C9.87445 36.3486 15.2554 40.9339 21.4863 46.2436C23.8082 48.2222 26.2092 50.2683 28.7654 52.5048L28.8422 52.5721C29.1736 52.8622 29.5868 53.0072 30 53.0072C30.4132 53.0072 30.8264 52.8621 31.1578 52.5721L31.2346 52.5048C33.7908 50.2683 36.1918 48.2223 38.514 46.2434C44.7447 40.9341 50.1255 36.3487 53.8658 31.9002C58.0508 26.9229 60 22.2795 60 17.2869C60 12.7004 58.4453 8.41043 55.6223 5.20711Z"
        fill="black"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect x="-28.8" y="-27.6001" width="294" height="268" fill="#86CCAC" />
    </g>
  </svg>
);

export default HeartIcon;

HeartIcon.propTypes = {
  height: PropTypes.string
};

HeartIcon.defaultProps = {
  height: ''
};
