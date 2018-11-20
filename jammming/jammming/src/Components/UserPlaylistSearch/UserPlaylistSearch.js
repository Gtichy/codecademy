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
                <Button color="primary" variant="outlined" onClick={this.props.onGetPlaylists}>GET PLAYLISTS</Button>
                <UserPlaylists playlists={this.props.userPlaylists} />  

            </div>
        )
        
    }
}
export default UserPlaylistSearch;