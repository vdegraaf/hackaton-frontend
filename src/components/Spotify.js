import React, {useState, useEffect} from 'react'
import SpotifyPresentational from './SpotifyPresentational'
import Lyrics from './Lyrics'
import request from 'superagent'
import './spotify.css';

const baseUrl = 'https://api.spotify.com'
const accessToken = 'BQAWOUKA4PC15i_kmJdayt2mjbSqy3vhpsLSYXea5HQUXP7edt4EP4tGZ-J0Zz1ZB9pvtIXGWxnU1hjOyb_wljA1-pkpB2BZg369NX6z1qKDJHsLpwjhB_27eFsEKqHgf2DpkJuLFN0aMARwO7uvcnvPrcYYIruFwXOgxqgRwFLiFmjiTPfowuFHOEg7xuUqky-7CR8Q7hh1rGR418cCxA3dycIFPBk8d_WZ9ftR6NwAJiYg-2yNZC9u4SePibiS6IWnombQXN-w'
const artist = 'spice girls'
const track = 'wanna'


const search = () => {
  return request
    .get(`${baseUrl}/v1/search?q=${artist}%20${track}&type=artist,track`)
    .set('Authorization', `Bearer  ${accessToken}`)
   
    .catch(console.error)
}

function Spotify() {
  
  let [trackUri, setTrackUri] = useState('')
  let [nameTrack, setNameTrack] = useState('')

  async function getUri() {
    trackUri = await search()
      .then(res => {
        nameTrack = res.body.tracks.items[0].name
        setNameTrack(nameTrack)
        return res.body.tracks.items[0].uri
      })

    setTrackUri(trackUri) 
  }
  getUri()

  if(trackUri) {
    return (<>
    <SpotifyPresentational trackUri={trackUri} artist={artist} track={nameTrack}/>
    <Lyrics artist={artist} track={nameTrack}/>
    </>
    );
  } else return (
    <h3>loading</h3>
  )
}

export default Spotify;