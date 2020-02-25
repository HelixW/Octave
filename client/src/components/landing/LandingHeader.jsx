/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import windowSize from 'react-window-size';
import PropTypes from 'prop-types';

import C2CLogo from '../C2CLogo';
import OctaveLogo from '../OctaveLogo';

class LandingHeader extends React.Component {
  render() {
    const { windowWidth } = this.props;

    return (
      <header className="flex col flex-col items-center justify-center w-screen">
        <C2CLogo
          height={(() => {
            if (windowWidth > 1600) return '113';
            if (windowWidth > 1140) return '96';
            return '60';
          })()}
          styles={(() => {
            if (windowWidth > 1600) return 'my-8';
            if (windowWidth > 1140) return 'my-6';
            return 'my-4';
          })()}
        />
        <OctaveLogo
          height={(() => {
            if (windowWidth > 1600) return '96';
            if (windowWidth > 1140) return '79';
            return '50';
          })()}
          styles={(() => {
            if (windowWidth > 1600) return 'my-8';
            if (windowWidth > 1140) return 'my-6';
            return 'my-4';
          })()}
        />
        <div className="font-light text-xl md:text-3xl lg:text-4xl text-center text-white ">
          <span className="text-green-600 ">You </span>
          choose what plays
        </div>
      </header>
    );
  }
}

export default windowSize(LandingHeader);

LandingHeader.propTypes = {
  windowWidth: PropTypes.number
};

LandingHeader.defaultProps = {
  windowWidth: 0
};
