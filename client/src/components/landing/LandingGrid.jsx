import React from 'react';
import windowSize from 'react-window-size';
import PropTypes from 'prop-types';

import OctaveInfo from './OctaveInfo';
import Divider from './Divider';
import HeartIcon from '../../icons/HeartIcon';
import AddIcon from '../../icons/AddIcon';
import RateUpIcon from '../../icons/RateUp';
import GoogleButton from './GoogleButton';

class LandingGrid extends React.Component {
  constructor(props) {
    super(props);

    const { windowWidth } = this.props;

    this.state = {
      information: [
        {
          id: 1,
          text: 'Upvote songs you like',
          icon: (
            <HeartIcon
              height={(() => {
                if (windowWidth > 1600) return '54';
                if (windowWidth > 1140) return '40';
                return '30';
              })()}
            />
          )
        },
        {
          id: 2,
          text: 'Add your own songs',
          icon: (
            <AddIcon
              height={(() => {
                if (windowWidth > 1600) return '79';
                if (windowWidth > 1140) return '65';
                return '42';
              })()}
            />
          )
        },
        {
          id: 3,
          text: 'Top rated songs get played first',
          icon: (
            <RateUpIcon
              height={(() => {
                if (windowWidth > 1600) return '76';
                if (windowWidth > 1140) return '62';
                return '40';
              })()}
            />
          )
        }
      ]
    };
  }

  render() {
    const { information } = this.state;
    const { history, windowWidth } = this.props;
    return (
      <div className="w-screen flex flex-col-reverse sm:flex-row mt-4 justify-around sm:justify-evenly items-center ">
        <div className="w-full sm:w-1/2 flex flex-col mx-2 my-auto justify-center items-stretch">
          {information.map(info => (
            <OctaveInfo key={info.id} Icon={info.icon}>
              {info.text}
            </OctaveInfo>
          ))}
        </div>
        <Divider
          height={(() => {
            if (windowWidth > 1600) return '450';
            if (windowWidth > 1140) return '300';
            return '250';
          })()}
          styles={windowWidth > 870 ? '' : 'hidden'}
        />
        <div className="sm:w-1/2 flex flex-col my-2 justify-center items-start px-32">
          <div className="text-white text-sm md:text-xl text-center w-48 md:w-64">
            To Continue
          </div>
          <GoogleButton history={history} />
        </div>
      </div>
    );
  }
}

export default windowSize(LandingGrid);

LandingGrid.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  windowWidth: PropTypes.number
};

LandingGrid.defaultProps = {
  history: {},
  windowWidth: 0
};
