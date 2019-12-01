const express = require('express')
const app = express()
const dotenv = require('dotenv')
const axios = require('axios')
const qs = require('qs')

dotenv.config()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    let access_token = req.query.access_token || null
    res.render('pages/index', {access_token})
    
})

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
        let config = {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Basic ${base64clientkey}`
            }
        }
        
        axios.post(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`, null, config)
        .then(response => {
            res.redirect(`/?access_token=${response.data.access_token}`)
        })
        .catch(err => {
            console.log(err)
        })
    }
})

app.listen(9000, () => {
    console.log('Server connected to port 9000!')
})

