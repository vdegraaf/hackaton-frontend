import request from 'superagent'

const baseUrl = 'https://accounts.spotify.com'
const client_id = "N2EzMmYzYjJlNGViNDQ3ZjgyOGRiMTZmMjZjYmU0YjY="
const client_secret = "MjQ0Y2Q3NmEyODNlNGU2ZmI5MGUxYzhmYWFiYjI0YzU="

const getAccessToken = () => {
  
  request
  .get(`${baseUrl}/authorize`)
  // .set('Authorization', `Basic ${client_id}:${client_secret}`)
  .set(`client_id : ${client_id}`)
  .set('response_type', 'token')
  .set('grant_type', 'client_credentials')
  .set('redirect_uri', )
  .then(res => {
    console.log(res, 'response')
  })

  .catch(console.error)
}

export default getAccessToken