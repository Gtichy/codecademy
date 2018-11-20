import React, { Component } from 'react';
import UserPlaylist from '../UserPlaylist/UserPlaylist';

class UserPlaylists extends Component {
    render(){
        return (
            <div>
            {
             this.props.playlists.map(playlist => {
                return <UserPlaylist key={playlist.id} playlist={playlist} />
            })
            }
            </div>
        );
    }
}

export default UserPlaylists;