import React, { Component } from 'react';
import UserPlaylist from '../UserPlaylist/UserPlaylist';

class UserPlaylists extends Component {
    render(){
        return (
            <div>
            {
             this.props.playlists.map(playlist => {
                return <UserPlaylist onGetTracks={this.props.onGetTracks} key={playlist.id} playlist={playlist} />
            })
            }
            </div>
        );
    }
}

export default UserPlaylists;