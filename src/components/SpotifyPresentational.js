import React from 'react';

function SpotifyPresentational({trackUri}) {
  return (
    <iframe src={`https://open.spotify.com/embed?uri=${trackUri}`} frameBorder="0" title="spotify"></iframe>
  );
}

export default SpotifyPresentational;