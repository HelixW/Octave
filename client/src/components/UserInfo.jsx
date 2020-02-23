import React from 'react';
import Arrow from './Arrow';

const UserInfo = () => (
  <div className="flex justify-end items-center cursor-pointer w-1/3">
    <span className="text-xl mx-5 username">John Doe</span>
    <span>
      <Arrow />
    </span>
  </div>
);

export default UserInfo;
