import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name: 'Cher',
        artist: 'cher',
        album: 'strong enough',
        id: '323'
      }],
      playlistName: 'Garretts Playlist',
      playlistTracks: [{
        name: 'Cher',
        artist: 'cher',
        album: 'strong enough',
        id: '1'
      },{
        name: 'Cher 2',
        artist: 'cher',
        album: 'strong enough',
        id: '2'     
      },{
        name: 'Cher 3',
        artist: 'cher',
        album: 'strong enough',
        id: '3'

      }] 
    }
  }
  
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else{
      
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
        
    );
  }
}

export default App;
