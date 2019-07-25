import React from 'react';

function SpotifyPresentational({trackUri, artist, track}) {
  return (
    <div className='container'>

      <div className='video'>
        <iframe src={`https://open.spotify.com/embed?uri=${trackUri}`} frameBorder="0"></iframe>
      </div>
      <h3>{`You're listening to ${track} of ${artist}.`}</h3>
      <h3>Let's sing along!!</h3>
    </div>
  );
}

export default SpotifyPresentational;