import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);

    this.state = {
      playlistName: '',
      searchResults: [],
      playlistTracks: []
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

  /* Updates the playlistName state when the input field changes */
  updatePlaylistName(name){
      this.setState({playlistName: name})
  }

  
  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(a => a.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)

  }

  searchSpotify(term){
    Spotify.search(term).then(track => {
      this.setState({searchResults: track});
    })    
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App"> 
          <SearchBar onSearch={this.searchSpotify}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks}/>
          {Spotify.getAccessToken()}

          </div>
        </div>
      </div>
        
    );
  }
}

export default App;
