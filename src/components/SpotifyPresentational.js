import React from 'react';

function SpotifyPresentational({trackUri}) {
  return (

    <iframe src={`https://open.spotify.com/embed?uri=${trackUri}`} frameborder="0"></iframe>
  );
}

export default SpotifyPresentational;