import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist.js';
import SearchResults from '../SearchResults/SearchResults.js';
import UserPlaylistSearch from '../UserPlaylistSearch/UserPlaylistSearch';
import Spotify from '../../util/Spotify';
import Navigation from '../Navigation/Navigation';
import SearchBar from '../SearchBar/SearchBar';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class HomePage extends Component {
    constructor(props){
      super(props);

      this.state = {
        snackbarOpen: false,
        playlistName: '',
        searchResults: [],
        playlistTracks: [],
        Playlists: [],
        currentPlaylistId: '',
        currentPlaylistInfo: {
          name: '',
          id: '',
          image: '',
          totalTracks: ''
        }
      }
    }

    componentDidMount(){
        this.getPlaylists();
      }
      // Snackbar Controls Open
  handleOpenSnackbar = (message) => {
    this.setState({snackbarOpen: true, snackbarMessage: message});
  }

  // Snackbar Controls Close
  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false});
  }

      // Snackbar Controls Open
  handleOpenSnackbar = (message) => {
    this.setState({snackbarOpen: true, snackbarMessage: message});
  }

  // Snackbar Controls Close
  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false});
  }

    /* Adds a track to the current playlist selected */
  addTrack = (track) =>{
    const { searchResults } = this.state;
    const { playlistTracks } = this.state;
    const currentTracks = searchResults;
    const newTracks = playlistTracks;

    if(this.state.currentPlaylistId === ''){
      this.handleOpenSnackbar('Please select a playlist')
      return;
    }else{
      this.setState({ playlistTracks: newTracks });
      console.log(this.state.playlistTracks);
        if(searchResults.find(trackToAdd => trackToAdd.uri === track.uri)) {
          const trackToAddIndex = currentTracks.indexOf(track);
          const match = this.state.playlistTracks.some(function(track){
            return track.uri === currentTracks[trackToAddIndex].uri;
          })
          if(!match){
            Spotify.addTracks(this.state.currentPlaylistId, currentTracks[trackToAddIndex].uri);
            this.handleOpenSnackbar(`${track.name} by ${track.artist} Added`)
        
            newTracks.push(track);
          }else{
            this.handleOpenSnackbar(`${track.name} is already on the list`)
          }
         }
      this.setState({ playlistTracks: newTracks });
    }
  }

  // Removes a track from the current selected playlist
  removeTrack = (track) =>{
    const { playlistTracks } = this.state;
    const currentTracks = playlistTracks;

   if(playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      const currentTrackIndex = currentTracks.indexOf(track);
      Spotify.removeTracks(this.state.currentPlaylistId, currentTracks[currentTrackIndex].uri);
      this.handleOpenSnackbar(`${this.state.playlistName} Song Removed`)
      currentTracks.splice(currentTrackIndex, 1);
    }else{
      return;
    }
    this.setState({ playlistTracks: currentTracks });
    
  }

  // Updates the playlistName state when the input field changes
  updatePlaylistName = (name) => {
    this.setState({playlistName: name})
}

// Creates a new playlist with no songs in it
createPlaylist = () => {
  Spotify.createPlaylist(this.state.playlistName).then(this.sleeper(2000)).then(() => {
    this.getPlaylists()
    this.handleOpenSnackbar(`${this.state.playlistName} Playlist created`)
  })
}

getPlaylistInfo = () => {
  Spotify.getPlaylistInfo(this.state.currentPlaylistId).then(playlist => {
    this.setState({currentPlaylistInfo: playlist})
  })
}

// Returns all the connected users playlists
getPlaylists = () => {
  Spotify.getPlaylists().then(playlist => {
    this.setState({Playlists: playlist})
  })
}

// Returns all the tracks associated with the selected playlist
getPlaylistTracks = (playlistId) =>{
  Spotify.getPlaylistTracks(playlistId).then(tracks =>{
    this.setState({playlistTracks: tracks, currentPlaylistId: playlistId});
  }).then(() => this.getPlaylistInfo())
}

  // Searches spotify and returns songs
  searchSpotify = (term) =>{
    if(term){
      Spotify.search(term).then(track => {
        this.setState({searchResults: track},this.handleOpenSnackbar('Search Successful'));
      })    
    }else{
      this.handleOpenSnackbar('Please enter a song or artist');
    }
  }

    render(){
        return (
            <div>
                <Navigation />
                <div className="App"> 
                    <SearchBar onSearch={this.searchSpotify}/>
                    <div className="App-playlist">
                        <UserPlaylistSearch onNameChange={this.updatePlaylistName} onAdd={this.createPlaylist} onGetTracks={this.getPlaylistTracks} onGetPlaylists={this.getPlaylists} userPlaylists={this.state.Playlists} />
                        <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} playlistInfo={this.state.currentPlaylistInfo}/>
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                    </div>
                </div>
                <Snackbar 
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    action={[
                      <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackbar}>CLOSE</Button>
                    ]}
                      autoHideDuration={4000}
                      open={this.state.snackbarOpen} 
                      onClose={this.handleCloseSnackbar} 
                      message={this.state.snackbarMessage}
                  />   

            </div>
            
        )
    }
}

export default HomePage;    