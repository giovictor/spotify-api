import React, {Component} from 'react'
import axios from 'axios'
import qs from 'query-string'

import Login from './Login'
import Playlist from './Playlist'

class HomePage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            access_token:localStorage.getItem('access_token') || null,
            refresh_token:localStorage.getItem('refresh_token') || null,
            loggedInUser:{},
            tracks:[]
        }
    }

    componentDidMount() {
        this.retrieveTokens()
        this.getLoggedInUserData()
    }

    getLoggedInUserData = () => {
        let config = {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        axios.get('https://api.spotify.com/v1/me',config)
        .then(response => {
            this.setState({loggedInUser:response.data})
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    searchSong = (keyword) => {
        if(keyword != '') {
            let config = {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }

            let q = encodeURIComponent(keyword)

            axios.get(`https://api.spotify.com/v1/search?q=${q}&type=track`, config)
            .then(response => {
                console.log(response.data.tracks.items[0])
                this.setState({tracks:response.data.tracks.items})
            })
            .catch(err =>{
                console.log(err.response)
            })
        } else {
            this.setState({tracks:[]})
        }
    }

    retrieveTokens = () => {
        if(this.props.location.search) {
            let { access_token, refresh_token } = qs.parse(this.props.location.search)
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)
            this.setState({access_token, refresh_token})
        }
    }

    render() {
        const { access_token, loggedInUser, tracks } = this.state
        return (
            <div className="App">
                <p>Spotify Client</p>
                { access_token != null ? <Playlist loggedInUser={loggedInUser} searchSong={this.searchSong} tracks={tracks}/> : <Login/> }
            </div>
        );
    }
}

export default HomePage;