import React from 'react';
import PropTypes from 'prop-types';

import LandingHeader from '../components/landing/LandingHeader';
import LandingGrid from '../components/landing/LandingGrid';

const LandingPage = props => {
  const { history } = props;
  return (
    <div className="bg-primary h-full cursor-default overflow-auto">
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
