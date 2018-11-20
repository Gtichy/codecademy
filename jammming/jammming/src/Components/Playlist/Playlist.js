import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

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
                <TextField
                    id="outlined-name"
                    label="Playlist Name"
                    placeholder="New Playlist Name"
                    onChange={this.handleNameChange}
                    margin="normal"
                    variant="outlined"
                />
                <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
                <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;