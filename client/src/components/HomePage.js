import React, {Component} from 'react'
import axios from 'axios'
import qs from 'query-string'
import { access } from 'fs'

class HomePage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            access_token:localStorage.getItem('access_token') || null,
            refresh_token:localStorage.getItem('refresh_token') || null,
            loggedInUser:{}
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
            console.log(response)
            this.setState({loggedInUser:response.data})
        })
        .catch(err => {
            console.log(err.response)
        })
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
        const { access_token, loggedInUser } = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <p>Spotify Client</p>
                        { access_token != null ?
                            <p>Welcome {loggedInUser.display_name}</p> :
                            <a className="App-link" href="http://localhost:4000/spotifylogin">Login with Spotify</a>
                        }
                </header>
            </div>
        );
    }
}

export default HomePage;