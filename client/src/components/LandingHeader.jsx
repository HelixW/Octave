import React from 'react';
import C2CLogo from './C2CLogo';

const LandingHeader = () => (
  <header className="flex col flex-col items-center justify-center">
    <C2CLogo />
    <h1 className="font-bold text-6xl text-center text-white">
      OCT
      <span className="text-green-600">A</span>
      VE
    </h1>
    <div className="font-light text-md text-center text-white">
      <span className="text-green-600">You </span>
      choose what plays
    </div>
  </header>
);

export default LandingHeader;
