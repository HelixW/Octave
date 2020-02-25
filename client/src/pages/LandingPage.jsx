import React from 'react';
import PropTypes from 'prop-types';

import LandingHeader from '../components/landing/LandingHeader';
import LandingGrid from '../components/landing/LandingGrid';

const LandingPage = props => {
  const { history } = props;
  return (
    <div className="bg-primary flex flex-col justify-center h-full cursor-default overflow-auto overflow-x-hidden">
      <LandingHeader />
      <LandingGrid history={history} />
    </div>
  );
};

export default LandingPage;

LandingPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

LandingPage.defaultProps = {
  history: {}
};
