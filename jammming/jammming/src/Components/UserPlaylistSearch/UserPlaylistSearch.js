import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './UserPlaylistSearch.css';
import UserPlaylists from '../UserPlaylists/UserPlaylists';

class UserPlaylistSearch extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="UserPlaylists">
            <h2>Your Playlists</h2>
                <Button color="primary" variant="outlined" onClick={this.props.onGetPlaylists}>GET PLAYLISTS</Button>
                <UserPlaylists onGetTracks={this.props.onGetTracks} playlists={this.props.userPlaylists} />  
            </div>
        )
        
    }
}
export default UserPlaylistSearch;