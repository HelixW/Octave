import React from 'react';

const PlayingCard = () => (
  <div className="bg-secondary">
    <img
      src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Trevor_Daniel_-_Falling.png/220px-Trevor_Daniel_-_Falling.png"
      alt="Album Art"
      className="w-full p-10 pb-5"
    />
    <div className="mx-10 pb-5">
      <div className="text-white text-4xl song-title">Falling</div>
      <div className="text-white text-xl text-faded">Trevor Daniels</div>
    </div>
  </div>
);

export default PlayingCard;
