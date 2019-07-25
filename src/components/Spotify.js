import React, { useState, useEffect } from 'react'
import SpotifyPresentational from './SpotifyPresentational'
import Lyrics from './Lyrics'
import request from 'superagent'
import './spotify.css';

const baseUrl = 'https://api.spotify.com'
const accessToken = 'BQDr8tyBGWskhhx9eoPVjTOJ3f8Nf9CNfpqbDy4EXfYcs48o3aTrHpK7qYOz9pavyAoV2wf6SqXu-MR71H8'
const artist = 'spice girls'
const track = 'wanna'


const requestRecord = () => {
  return request
    .get('http://63617976.ngrok.io/api/text')
    /*.then((response) => {
      return response.body
    })*/
    // .catch(console.error)
}

const search = (artist, title) => {
  return request
    .get(`${baseUrl}/v1/search?q=${artist}%20${title}&type=artist,track`)
    .set('Authorization', `Bearer  ${accessToken}`)
    .then((response) => {
      return response.body
    })
    .catch(console.error)
}

const isDifferentRecord = (record, result) => {
  return record.artist !== result.artist && record.title !== result.title
}

function Spotify() {

  let [trackUri, setTrackUri] = useState('')
  let [record, setRecord] = useState('')
  let [nameTrack, setNameTrack] = useState('')
  let [artist, setArtist] = useState('')

  async function poll() {
    await requestRecord().then((res) => {
      // console.log(res.body)
      trackUri = getUri(res.body.arist, res.body.song)
    })
  }

  async function getUri(artist, title) {
    await search(artist, title)
      .then(res => {
        console.log(res)
        setArtist(res.tracks.items[0].artists[0].name)
        setNameTrack(res.tracks.items[0].name)
        setTrackUri(res.tracks.items[0].uri)
      })
  }

  useEffect(() => {
    poll()
  })

  if (trackUri) {
    // setInterval(poll, 2000)

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