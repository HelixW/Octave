import React from 'react';
import PropTypes from 'prop-types';

const OctaveInfo = ({ Icon, children }) => {
  return (
    <div className="uppercase my-8 text-2xl flex justify-between items-center">
      <span className="text-white text-right w-4/5 py-auto h-10 leading-10">
        {children}
      </span>
      <span className="w-1/5 flex justify-center">{Icon}</span>
    </div>
  );
};

export default OctaveInfo;

OctaveInfo.propTypes = {
  children: PropTypes.string,
  Icon: PropTypes.element
};

OctaveInfo.defaultProps = {
  children: '',
  Icon: '<>'
};
