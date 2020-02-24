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
      user: {
        id: 123,
        username: 'John Doe',
        avatar:
          'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
      },
      nowPlaying: {
        id: 1,
        title: 'Falling',
        artist: 'Trevor Daniels',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Trevor_Daniel_-_Falling.png/220px-Trevor_Daniel_-_Falling.png'
      },
      nextUp: {
        id: 2,
        title: 'Chlorine',
        artist: 'Twenty One Pilots',
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png'
      },
      queue: [
        {
          id: 3,
          title: 'Chlorine',
          artist: 'Twenty One Pilots',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 20
        },
        {
          id: 4,
          title: 'Chlorine',
          artist: 'Twenty One Pilots',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 4
        },
        {
          id: 5,
          title: 'Chlorine',
          artist: 'Twenty One Pilots',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 2
        },
        {
          id: 6,
          title: 'Chlorine',
          artist: 'Twenty One Pilots',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 1
        },
        {
          id: 7,
          title: 'Chlorine',
          artist: 'Twenty One Pilots',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 19
        },
        {
          id: 8,
          title: 'Chlorine',
          artist: 'Twenty One Pilots',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 12
        }
      ]
    };
  }

  render() {
    const { history } = this.props;
    const { user, nowPlaying, nextUp, queue } = this.state;
    return (
      <div className="bg-primary h-full cursor-default overflow-auto">
        <Navbar
          history={history}
          username={user.username}
          avatar={user.avatar}
        />
        <div className="mx-32 flex">
          <PlayingSection nowPlaying={nowPlaying} />
          <div className="w-7/12 flex flex-col">
            <NextUpSection nextUp={nextUp} />
            <QueueSection queue={queue} />
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
