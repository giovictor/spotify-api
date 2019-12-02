import React, {Component} from 'react'
import axios from 'axios'
import qs from 'query-string'

class HomePage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            access_token:'',
            refresh_token:''
        }
    }

    componentDidMount() {
        this.retrieveTokens()
        this.getLoggedInUserData()
        console.log(this.state)
    }

    getLoggedInUserData = () => {
        let access_token = this.state.access_token
        axios.get('https://api.spotify.com/v1/me', null, {
            headers: { 'Authorization':`Bearer ${access_token}`}
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        console.log(access_token)
    }

    retrieveTokens = () => {
        if(this.props.location.search) {
            let { access_token, refresh_token } = qs.parse(this.props.location.search)
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)

            this.setState({access_token})
            this.setState({refresh_token})
        } else {
            this.setState({access_token:localStorage.getItem('access_token')})
            this.setState({refresh_token:localStorage.getItem('refresh_token')})
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