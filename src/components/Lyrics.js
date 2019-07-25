import React, {useState, useEffect} from 'react'
import request from 'superagent'

const searchLyrics = (artist, track) => {
  console.log(artist, track)
  return request
    .get(`https://api.lyrics.ovh/v1/${artist}/${track}`)
    .then(res => {
      console.log(res.body.lyrics, 'res')
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
    <div>{lyrics}</div>
    </>
    );
  } else return (
    <h3>loading</h3>
  )
}

export default Lyrics