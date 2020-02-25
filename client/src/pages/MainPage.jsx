import React from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';

import Navbar from '../components/main/Navbar';
import PlayingSection from '../components/main/PlayingSection';
import NextUpSection from '../components/main/NextUpSection';
import QueueSection from '../components/main/QueueSection';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        userID: 123,
        username: 'John Doe',
        avatar:
          'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
      },
      nowPlaying: {
        id: uuid(),
        title: 'Falling',
        artists: ['Trevor Daniels'],
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Trevor_Daniel_-_Falling.png/220px-Trevor_Daniel_-_Falling.png',
        likedBy: [11, 1231, 123]
      },
      nextUp: {
        id: uuid(),
        title: 'Chlorine',
        artists: ['Twenty One Pilots'],
        albumArt:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
        likedBy: [1234]
      },
      queue: [
        {
          id: 1,
          title: 'Chlorine',
          artists: ['Twenty One Pilots'],
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 20,
          likedBy: [123]
        },
        {
          id: uuid(),
          title: 'Chlorine',
          artists: ['Twenty One Pilots'],
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 4,
          likedBy: [1]
        },
        {
          id: uuid(),
          title: 'Chlorine',
          artists: ['Twenty One Pilots'],
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 2,
          likedBy: [123]
        },
        {
          id: uuid(),
          title: 'Chlorine',
          artists: ['Twenty One Pilots'],
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 1,
          likedBy: [13]
        },
        {
          id: uuid(),
          title: 'Chlorine',
          artists: ['Twenty One Pilots'],
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 19,
          likedBy: [123]
        },
        {
          id: uuid(),
          title: 'Chlorine',
          artists: ['Twenty One Pilots'],
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Trench_Twenty_One_Pilots.png/220px-Trench_Twenty_One_Pilots.png',
          upVotes: 12,
          likedBy: [3]
        }
      ],

      songSearch: [
        {
          id: 1,
          title: 'Closer (feat. Halsey)',
          artists: ['The Chainsmokers', 'Halsey'],
          albumArt:
            'https://i.scdn.co/image/ab67616d0000b273495ce6da9aeb159e94eaa453'
        },
        {
          id: uuid(),
          title: 'Closer',
          artists: ['Mickey Singh', 'Dilpreet Dhillon'],
          albumArt:
            'https://i.scdn.co/image/ab67616d0000b2733e6b572922169a736610f5c1'
        }
      ]
    };
  }

  render() {
    const { history } = this.props;
    const { user, nowPlaying, nextUp, queue, songSearch } = this.state;
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
            <QueueSection queue={queue} user={user} songSearch={songSearch} />
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
