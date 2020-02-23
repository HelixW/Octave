import React from 'react';
import PropTypes from 'prop-types';

import GoogleIcon from '../../icons/GoogleIcon.png';
// Fake Auth
import auth from '../../auth';

const GoogleButton = props => {
  return (
    <button
      className="bg-white flex justify-center items-middle text-middle w-64 cursor-pointer my-4 hover:bg-gray-300 flex-stretch"
      type="button"
      onClick={() => {
        auth.login(() => {
          props.history.push('/main');
        });
      }}
    >
      <div className="flex justify-center items-center mx-3 my-auto">
        <img src={GoogleIcon} alt="Google Icon" height="32px" width="32px" />
      </div>
      <div className="mx-3 text-xl">Sign in with Google</div>
    </button>
  );
};

export default GoogleButton;

GoogleButton.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

GoogleButton.defaultProps = {
  history: {}
};
