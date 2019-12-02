import React, {Component} from 'react'
import axios from 'axios'
import qs from 'query-string'

class HomePage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            access_token:localStorage.getItem('access_token') || null,
            refresh_token:localStorage.getItem('refresh_token') || null,
        }
    }

    componentDidMount() {
        this.retrieveTokens()
        this.getLoggedInUserData()
    }

    getLoggedInUserData = () => {
        console.log(this.state.access_token)
        let access_token = 'BQCMhsE1GQt8OArgNWCDXoon4HsZEHYjfm_-d5gXs_F1AgARfq3JilmunIx2Gs_YAkPdoAst_iuRz4cWqQ59b0j5j-t3O26lBFfSXqNLfL5Hs8mG_URmZ0ypEntU13qZjr_2baqtJjVKmRPIBwhRHjBQo5ENKCsMcQ'
        axios.get('https://api.spotify.com/v1/me', null, {
            headers: { 'Authorization':`Bearer ${access_token}`}
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
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
        return (
            <div className="App">
                <header className="App-header">
                    <p>Spotify Client</p>
                    <a className="App-link" href="http://localhost:4000/spotifylogin">Login with Spotify</a>
                </header>
            </div>
        );
    }
}

export default HomePage;