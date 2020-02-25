import React from 'react';

class SearchBox extends React.Component {
  constructor() {
    super();

    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Pass title value to parent
    this.setState({ title: '' });
  }

  render() {
    const { title } = this.state;
    return (
      <form className="flex flex-row" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="bg-faded px-8 py-0 text-xl text-white box-border w-11/12 placeholder-white"
          placeholder="Add a Song to Queue"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          className="h-full w-1/12 cursor-pointer text-5xl leading-none hover:bg-green-700 bg-contrast"
          value="+"
        />
      </form>
    );
  }
}

export default SearchBox;
