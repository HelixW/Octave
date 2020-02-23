import React from 'react';
import PropTypes from 'prop-types';

const Arrow = props => {
  const { isOpen } = props;
  const styles = isOpen ? 'transform rotate-180' : '';
  return (
    <svg
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles}
    >
      <path
        d="M7.5 7L7.16086 7.3674L7.5 7.68045L7.83914 7.3674L7.5 7ZM14.3391 1.3674C14.5421 1.1801 14.5547 0.86377 14.3674 0.66086C14.1801 0.45795 13.8638 0.445296 13.6609 0.632598L14.3391 1.3674ZM0.66086 1.3674L7.16086 7.3674L7.83914 6.6326L1.33914 0.632598L0.66086 1.3674ZM7.83914 7.3674L14.3391 1.3674L13.6609 0.632598L7.16086 6.6326L7.83914 7.3674Z"
        fill="white"
      />
    </svg>
  );
};

export default Arrow;

Arrow.propTypes = {
  isOpen: PropTypes.bool
};

Arrow.defaultProps = {
  isOpen: false
};
