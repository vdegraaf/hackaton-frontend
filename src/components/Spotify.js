import React, { useState, useEffect } from 'react'
import SpotifyPresentational from './SpotifyPresentational'
import request from 'superagent'

const baseUrl = 'https://api.spotify.com'
const accessToken = 'BQALkMuq5jq8e2tk1l7CKmR8TXpO525AJHtbYerVQMxBilohre1HKRhNa-qc0a1PopzGlf0p2oVEcgtPNuU'
// const artist = 'donavon frankenreiter'
// const track = 'hit the ground running'
let interval = null

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

  async function poll() {
    const result = await requestRecord()

    // if ((result && isDifferentRecord(record, result)) || Object.values(record).length == 0) {

    trackUri = await search(result.artist, result.title)

    setTrackUri(trackUri)
  }

  useEffect(() => {
    poll()
  })

  if (trackUri) {
    setInterval(poll, 2000)


    return (<>
      <SpotifyPresentational trackUri={trackUri}/>
    </>
    )
  } else {
    return (
      <h3>loading</h3>
    )
  }
}

export default Spotify