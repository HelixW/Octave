import React from 'react';
import PropTypes from 'prop-types';

import Arrow from '../Arrow';

const UserInfo = props => {
  const { username } = props;
  return (
    <div className="flex justify-end items-center cursor-pointer username">
      <span className="text-xl mx-5">{username}</span>
      <span>
        <Arrow />
      </span>
    </div>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  username: PropTypes.string
};

UserInfo.defaultProps = {
  username: ''
};
