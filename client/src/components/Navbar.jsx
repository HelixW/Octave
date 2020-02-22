import React from 'react';
import C2CLogo from './C2CLogo';
import OctaveLogo from './OctaveLogo';
import UserInfo from './UserInfo';

const Navbar = () => (
  <nav className="h-20 bg-secondary text-white px-32 flex items-center">
    <div className="flex justify-start w-1/3">
      <C2CLogo height="50" />
    </div>
    <OctaveLogo height="30" styles="my-auto w-1/3" />
    <UserInfo />
  </nav>
);

export default Navbar;
