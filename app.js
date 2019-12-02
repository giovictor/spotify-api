const express = require('express')
const app = express()
const dotenv = require('dotenv')
const axios = require('axios')
const cors = require('cors')

dotenv.config()
app.use(cors())
app.set('view engine', 'ejs')

app.get('/spotifylogin', (req, res) => {
    let client_id = process.env.CLIENT_ID
    let redirect_uri = encodeURIComponent(process.env.REDIRECT_URI)
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`)
})

app.get('/spotifyredirect', (req, res) => {
    if(req.query.code) {
        let code = req.query.code
        let base64clientkey = process.env.CLIENT_KEY
        let redirect_uri = encodeURIComponent(process.env.REDIRECT_URI)
        let client_redirect_uri = process.env.CLIENT_REDIRECT_URI
        let config = {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Basic ${base64clientkey}`
            }
        }
        
        axios.post(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`, null, config)
        .then(response => {
            res.redirect(`${client_redirect_uri}/?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}`)
        })
        .catch(err => {
            console.log(err)
        })
    }
})

app.listen(4000, () => {
    console.log('Server connected to port 4000!')
})

