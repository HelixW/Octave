import React from 'react';

const SearchBox = () => (
  <div className="mb-5 py-2 flex flex-stretch w-2/3">
    <input
      type="text"
      className="h-full bg-secondary px-8 py-0 text-xl text-white box-border w-11/12"
      placeholder="Add a Song to Queue"
    />
    <input
      type="submit"
      className="h-full w-1/12 cursor-pointer text-5xl leading-none hover:bg-green-700 bg-contrast"
      value="+"
    />
  </div>
);

export default SearchBox;
