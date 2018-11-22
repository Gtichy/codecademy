import React, { Component } from 'react';
import UserPlaylist from '../UserPlaylist/UserPlaylist';

class UserPlaylists extends Component {
    
    sortList = (property) => {
        var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
    }
    
    render(){
        
        const sortedList = this.props.playlists.sort(this.sortList('name'));
        console.log(sortedList);
        return (
            <div>
            {
             sortedList.map(playlist => {
              return <UserPlaylist onGetTracks={this.props.onGetTracks} key={playlist.id} playlist={playlist} />
            })
            }
            </div>
        );
    }
}

export default UserPlaylists;