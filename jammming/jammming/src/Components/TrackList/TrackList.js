import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
            <Track />
            </div>
        )
    }
}

export default TrackList;