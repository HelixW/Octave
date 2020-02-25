import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';
import SearchBox from './SearchBox';
import SearchCard from './SearchCard';

class QueueSection extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => ({ isOpen: false }));
  }

  render() {
    let { queue } = this.props;
    const { user, songSearch } = this.props;
    const { isOpen } = this.state;

    queue = queue.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));

    return (
      <section className="mt-5 pl-10">
        <div className="flex justify-between">
          <SectionHeader>Queue</SectionHeader>
          <div className="flex flex-col w-2/3 mb-5 py-2 items-stretch relative">
            <SearchBox />
            <div className={isOpen ? '' : 'hidden'}>
              <div className="bg-lighter-primary absolute w-full border-solid border-4 border-lighter-primary">
                {songSearch.map(songInfo => (
                  <SearchCard
                    songInfo={songInfo}
                    key={songInfo.id}
                    queue={queue}
                    handleClick={this.handleClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll h-queue">
          {queue.map(songInfo => (
            <SongCard
              styles="mb-1"
              songInfo={songInfo}
              key={songInfo.id}
              user={user}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default QueueSection;

QueueSection.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
  songSearch: PropTypes.arrayOf(PropTypes.any)
};

QueueSection.defaultProps = {
  queue: [],
  user: {},
  songSearch: []
};
