import React from 'react'

const Track = ({track}) => {
    return (
        <div className="track">
            <img src={track.album.images[2].url} />
            <p>{track.name}</p>
            <p>{track.artists.map(artist => `${artist.name},`) /* FIX: Comma separation */}</p>
            <p>{track.album.name}</p>
            {/* <audio>
                <source src={track.external_urls.spotify} type="audio/ogg"/>
            </audio> */}
        </div>
    )
}

export default Track
