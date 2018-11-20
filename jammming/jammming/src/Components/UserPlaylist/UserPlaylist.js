import React, { Component } from 'react';

class UserPlaylist extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="User-playlist">
            <div className="User-playlist-info">
                <h3>{this.props.playlist.name}</h3>
            </div>
        </div>
        )
    }
}
export default UserPlaylist;