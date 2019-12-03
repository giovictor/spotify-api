import React, {Fragment, Component} from 'react'
import Track from './Track'
class Playlist extends Component {
    detectSong = (e) => {
        this.props.searchSong(e.target.value)
    }   

    render() {
        const { loggedInUser, tracks } = this.props
        return (
            <Fragment>
                <p>Welcome {loggedInUser.display_name}</p>
                <input type="text" name="search" placeholder="Search for a song..." onKeyUp={this.detectSong}/>
                { tracks.map(track => <Track track={track} key={track.id}/>) }
            </Fragment>
        )
    }
}

export default Playlist
