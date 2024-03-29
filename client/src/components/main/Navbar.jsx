import React from 'react';
import PropTypes from 'prop-types';

import C2CLogo from '../C2CLogo';
import OctaveLogo from '../OctaveLogo';
import UserInfo from './UserInfo';
import UserDropdown from './UserDropdown';

class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  dropdownOpen() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { history, username, avatar } = this.props;
    return (
      <div className="relative">
        <nav className="h-20 bg-secondary text-white px-32 flex items-center">
          <div className="flex justify-start w-1/3">
            <C2CLogo height="50" />
          </div>
          <OctaveLogo height="30" styles="my-auto w-1/3" />
          <div
            className="w-1/3 focus:outline-none cursor-default"
            onClick={this.dropdownOpen.bind(this)}
            role="button"
            tabIndex={0}
          >
            <UserInfo username={username} isOpen={isOpen} />
          </div>
        </nav>
        <UserDropdown isOpen={isOpen} history={history} avatar={avatar} />
      </div>
    );
  }
}

export default Navbar;

Navbar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  username: PropTypes.string,
  avatar: PropTypes.string
};

Navbar.defaultProps = {
  history: {},
  username: '',
  avatar: ''
};
