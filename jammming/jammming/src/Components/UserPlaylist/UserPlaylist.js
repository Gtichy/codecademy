import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
          console.log(this.props.playlist);

          return (
            <div className="User-playlist">
            <div className="Playlist-information">
                <div className="Playlist-image">
                <img src={this.props.playlist.image}/>
                </div>
                <div className="Playlist-details">
                <h3>{this.props.playlist.name}</h3>
                <p>Total songs: {this.props.playlist.trackCount}</p>                
                </div>
            </div>
            <IconButton color="secondary" onClick={this.getPlaylistTracks} aria-label="Edit Playlist">
                    <Icon>edit</Icon>
            </IconButton>
        </div>
        )
    }
}
export default UserPlaylist;