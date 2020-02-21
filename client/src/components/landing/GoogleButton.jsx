import React from 'react';
import GoogleIcon from './GoogleIcon.png';

const GoogleButton = () => (
  <div className="bg-white flex justify-center items-middle text-middle w-64 cursor-pointer">
    <div className="flex justify-center items-center mx-3">
      <img src={GoogleIcon} alt="Google Icon" height="32px" width="32px" />
    </div>
    <div className="mx-3">Sign in with Google</div>
  </div>
);

export default GoogleButton;
