import React from 'react';

class UserDropdown extends React.Component {
  constructor() {
    super();

    this.state = { userDropdown: { isOpen: true } };
  }

  render() {
    const { userDropdown } = this.state;
    return (
      <>
        {userDropdown.isOpen ? (
          <div className="text-white bg-faded absolute right-0 mr-24 flex flex-col shadow-lg">
            <div className="px-12 py-4">
              <img
                src="https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
                alt="Avatar"
                className="h-32 rounded-full"
              />
            </div>
            <div className="bg-contrast text-xl font-bold text-center w-full uppercase py-2 cursor-pointer  hover:bg-green-700">
              Log Out
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default UserDropdown;
