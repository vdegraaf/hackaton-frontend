import React, {useState, useEffect} from 'react'
import request from 'superagent'

const searchLyrics = (artist, track) => {
  
  return request
    .get(`https://api.lyrics.ovh/v1/${artist}/${track}`)
    .then(res => {
      return res.body.lyrics
    })
    .catch(console.error)
}

function Lyrics({artist, track}) {

  let [lyrics, setLyrics] = useState('')

  async function getLyrics() {
    lyrics = await searchLyrics(artist, track)
    setLyrics(lyrics)
  }
  getLyrics()

  if(lyrics) {
    return (<>
    <pre>{lyrics}</pre>
    </>
    );
  } else return (
    <h3>There are no lyrics available for this song</h3>
  )
}

export default Lyrics