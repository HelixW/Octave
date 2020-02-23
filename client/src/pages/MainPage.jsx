import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/main/Navbar';
import PlayingSection from '../components/main/PlayingSection';
import NextUpSection from '../components/main/NextUpSection';
import QueueSection from '../components/main/QueueSection';

const MainPage = props => {
  const { history } = props;
  return (
    <div className="bg-primary h-full cursor-default overflow-auto">
      <Navbar history={history} />
      <div className="mx-32 flex">
        <PlayingSection />
        <div className="w-7/12 flex flex-col">
          <NextUpSection />
          <QueueSection />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

MainPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

MainPage.defaultProps = {
  history: {}
};
