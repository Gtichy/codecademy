import React, { Component } from 'react';

class PlaylistInfo extends Component {
    render(){
        return (
            <div className="User-playlist">
            <div className="Playlist-information">
                <div className="Playlist-image">
                <img src={this.props.playlistInfo.image}/>
                </div>
                <div className="Playlist-details">
                <h3>{this.props.playlistInfo.name}</h3>
                <p>Total songs: {this.props.playlistInfo.trackCount}</p>                
                </div>
            </div>
            </div>
        )
    }
}

export default PlaylistInfo;