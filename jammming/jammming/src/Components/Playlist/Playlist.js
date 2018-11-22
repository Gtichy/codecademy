import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';

class Playlist extends Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
        }

    render() {
        return (
            <div className="Playlist">
                <PlaylistInfo playlistInfo={this.props.playlistInfo} /> 
                <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
            </div>
        )
    }
}

export default Playlist;