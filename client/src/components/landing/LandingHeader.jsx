import React from 'react';
import C2CLogo from '../C2CLogo';
import OctaveLogo from '../OctaveLogo';

const LandingHeader = () => (
  <header className="flex col flex-col items-center justify-center w-screen ">
    <C2CLogo height="113" styles="my-10" />
    <OctaveLogo height="96" styles="my-10" />
    <div className="font-light text-4xl text-center text-white">
      <span className="text-green-600 ">You </span>
      choose what plays
    </div>
  </header>
);

export default LandingHeader;
