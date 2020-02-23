import React from 'react';
import PropTypes from 'prop-types';

import OctaveInfo from './OctaveInfo';
import Divider from './Divider';
import { ReactComponent as HeartIcon } from '../../icons/HeartIcon.svg';
import { ReactComponent as AddIcon } from '../../icons/AddIcon.svg';
import { ReactComponent as RateUpIcon } from '../../icons/RateUp.svg';
import GoogleButton from './GoogleButton';

class LandingGrid extends React.Component {
  constructor() {
    super();

    this.state = {
      information: [
        { id: 1, text: 'Upvote songs you like', icon: <HeartIcon /> },
        { id: 2, text: 'Add your own songs', icon: <AddIcon /> },
        {
          id: 3,
          text: 'Top rated songs get played first',
          icon: <RateUpIcon />
        }
      ]
    };
  }

  render() {
    const { information } = this.state;
    const { history } = this.props;
    return (
      <div className="w-screen flex rotate-270">
        <div className="w-1/2 flex flex-col mx-2 my-auto">
          {information.map(info => (
            <OctaveInfo key={info.id} Icon={info.icon}>
              {info.text}
            </OctaveInfo>
          ))}
        </div>
        <Divider />
        <div className="w-1/2 flex flex-col my-2 justify-center items-start px-32">
          <div className="text-white text-xl text-center w-64">To Continue</div>
          <GoogleButton history={history} />
        </div>
      </div>
    );
  }
}

export default LandingGrid;

LandingGrid.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

LandingGrid.defaultProps = {
  history: {}
};
