import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    this.state = {
      searchResults: [{
        name: 'Algorithm',
        artist: 'Muse',
        album: 'Suspended Reality',
        id: '5'
      },{
        name: 'Drones',
        artist: 'Muse',
        album: 'Suspended Reality',
        id: '6'
      }],
      playlistName: 'Garretts Playlist',
      playlistTracks: [{
        name: 'Supersonic',
        artist: '311',
        album: 'modest',
        id: '1'
      },{
        name: 'Cher',
        artist: 'cher',
        album: 'strong enough',
        id: '2'     
      },{
        name: 'suicidal',
        artist: 'Metric',
        album: 'Paper Airplanes',
        id: '3'

      }],
      newTrack: {
          name: 'Garbo singer',
          artist: 'The Garb',
          album: 'so strong',
          id: '4'
      }
    }
  }
  
  addTrack(track){
    const { playlistTracks } = this.state;
    const newTracks = playlistTracks;

   if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else{
      newTracks.push(track);
    }

    this.setState({ playlistTracks: newTracks });
  }

  removeTrack(track){
    const { playlistTracks } = this.state;
    const currentTracks = playlistTracks;

   if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      const currentTrackIndex = currentTracks.indexOf(track);
      currentTracks.splice(currentTrackIndex, 1);

    }else{
      return;
    }

    this.setState({ playlistTracks: currentTracks });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
        
    );
  }
}

export default App;
