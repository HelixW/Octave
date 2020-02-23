import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/main/Navbar';
import PlayingSection from '../components/main/PlayingSection';
import NextUpSection from '../components/main/NextUpSection';
import QueueSection from '../components/main/QueueSection';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      nowPlaying: {
        title: 'Falling',
        artist: 'Trevor Daniels',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Trevor_Daniel_-_Falling.png/220px-Trevor_Daniel_-_Falling.png'
      }
      // nextUp: {},
      // songQueue: {}
    };
  }

  render() {
    const { history } = this.props;
    const { nowPlaying } = this.state;
    return (
      <div className="bg-primary h-full cursor-default overflow-auto">
        <Navbar history={history} />
        <div className="mx-32 flex">
          <PlayingSection nowPlaying={nowPlaying} />
          <div className="w-7/12 flex flex-col">
            <NextUpSection />
            <QueueSection />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

MainPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

MainPage.defaultProps = {
  history: {}
};
