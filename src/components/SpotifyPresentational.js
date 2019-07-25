import React from 'react';

function SpotifyPresentational({trackUri}) {
  return (
    <div className='container'>
      <div className='video'>
        <iframe src={`https://open.spotify.com/embed?uri=${trackUri}`} frameborder="0"></iframe>
      </div>
    </div>
  );
}

export default SpotifyPresentational;