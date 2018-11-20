import React, { Component } from 'react';
import './UserPlaylist.css';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

class UserPlaylist extends Component {
    constructor(props){
        super(props);

        this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    }

    getPlaylistTracks(){
        this.props.onGetTracks(this.props.playlist.id);
    }

    render(){
        return (
            <div className="User-playlist">
            <div className="Playlist-information">
                <h3>{this.props.playlist.name}</h3>
                <p>Total songs: {this.props.playlist.trackCount}</p>
            </div>
            <IconButton color="secondary" onClick={this.getPlaylistTracks} aria-label="Edit Playlist">
                    <Icon>edit</Icon>
            </IconButton>
        </div>
        )
    }
}
export default UserPlaylist;