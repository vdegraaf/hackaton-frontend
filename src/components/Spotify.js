import React, {useState, useEffect} from 'react'
import SpotifyPresentational from './SpotifyPresentational'
import request from 'superagent'

const baseUrl = 'https://api.spotify.com'
const accessToken = 'BQA-p2X4ihIAvYOe21U7li78jhU-KI9xMpzVkQW5yx_N3cpX_Pzq-7bnFwEKBSyd-vGIBkuXwgD9jyBjKyM'
const artist = 'donavon frankenreiter'
const track = 'hit the ground running'

const search = () => {
  return request
    .get(`${baseUrl}/v1/search?q=${artist}%20${track}&type=artist,track`)
    .set('Authorization', `Bearer  ${accessToken}`)
    .then(res => {
      return res.body.tracks.items[0].uri
    })
    .catch(console.error)
}

function Spotify() {
  
  let [trackUri, setTrackUri] = useState('')

  async function getUri() {
    trackUri = await search()
    setTrackUri(trackUri) 
  }
  getUri()

  if(trackUri) {
    return (<>
    <SpotifyPresentational trackUri={trackUri}/>
    </>
    );
  } else return (
    <h3>loading</h3>
  )
}

export default Spotify;