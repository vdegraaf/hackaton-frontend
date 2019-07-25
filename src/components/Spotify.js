import React, { useState, useEffect } from 'react'
import SpotifyPresentational from './SpotifyPresentational'
import Lyrics from './Lyrics'
import request from 'superagent'
import './spotify.css';

const baseUrl = 'https://api.spotify.com'
const accessToken = 'BQAWOUKA4PC15i_kmJdayt2mjbSqy3vhpsLSYXea5HQUXP7edt4EP4tGZ-J0Zz1ZB9pvtIXGWxnU1hjOyb_wljA1-pkpB2BZg369NX6z1qKDJHsLpwjhB_27eFsEKqHgf2DpkJuLFN0aMARwO7uvcnvPrcYYIruFwXOgxqgRwFLiFmjiTPfowuFHOEg7xuUqky-7CR8Q7hh1rGR418cCxA3dycIFPBk8d_WZ9ftR6NwAJiYg-2yNZC9u4SePibiS6IWnombQXN-w'
const artist = 'spice girls'
const track = 'wanna'


const requestRecord = () => {
  return request
    .get('http://www.mocky.io/v2/5d39a2b42f000049006ebce2')
    .then((response) => {
      return response.body
    })
    .catch(console.error)
}

const search = (artist, title) => {
  return request
    .get(`${baseUrl}/v1/search?q=${artist}%20${title}&type=artist,track`)
    .set('Authorization', `Bearer  ${accessToken}`)
    .then((response) => {
      return response.body.tracks.items[0].uri
    })
    .catch(console.error)
}

const isDifferentRecord = (record, result) => {
  console.log(record, result);
  return record.artist !== result.artist && record.title !== result.title
}

function Spotify() {

  let [trackUri, setTrackUri] = useState('')
  let [record, setRecord] = useState('')
  let [nameTrack, setNameTrack] = useState('')

  async function poll() {
    const result = await requestRecord()

    // if ((result && isDifferentRecord(record, result)) || Object.values(record).length == 0) {

    trackUri = await search(result.artist, result.title)

    setTrackUri(trackUri)
  }

  async function getUri() {
    trackUri = await search()
      .then(res => {
        nameTrack = res.body.tracks.items[0].name
        setNameTrack(nameTrack)
        return res.body.tracks.items[0].uri
      })

    setTrackUri(trackUri)
  }

  useEffect(() => {
    poll()
  })

  if (trackUri) {
    setInterval(poll, 2000)

    return (<>
    <SpotifyPresentational trackUri={trackUri} artist={artist} track={nameTrack}/>
    <Lyrics artist={artist} track={nameTrack}/>
    </>
    )
  } else {
    return (
      <h3>loading</h3>
    )
  }
}

export default Spotify;