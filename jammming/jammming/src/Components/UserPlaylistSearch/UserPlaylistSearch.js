import React, { Component } from 'react';

class UserPlaylistSearch extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="UserPlaylists">
                <button onClick={this.props.onGetPlaylists} className="Playlist-get">GET YOUR PLAYLISTS</button>
            </div>
        )
        
    }
}
export default UserPlaylistSearch;