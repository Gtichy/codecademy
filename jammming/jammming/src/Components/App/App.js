import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/Spotify';
import UserPlaylistSearch from '../UserPlaylistSearch/UserPlaylistSearch';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);

    this.state = {
      snackbarOpen: false,
      hasAccessToken: false,
      snackbarMessage: '',
      playlistName: '',
      searchResults: [],
      playlistTracks: [],
      Playlists: [],
      currentPlaylistId: '',
      currentPlaylistName: ''
    }
  }

  componentDidMount(){
    this.handleAccessToken();
    this.getPlaylists();
  }

 sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

  handleAccessToken = () => {
    const accessToken = Spotify.getAccessToken();
    if(accessToken){
      this.setState({hasAccessToken: true})
    }else{
      this.setState({hasAccessToken: false})
    }
  }

  handleRedirect(){
    Spotify.redirect()
  }
  
  addTrack(track){
    const { searchResults } = this.state;
    const { playlistTracks } = this.state;
    const currentTracks = searchResults;
    const newTracks = playlistTracks;

    this.setState({ playlistTracks: newTracks });
    if(searchResults.find(trackToAdd => trackToAdd.uri === track.uri)) {
      const trackToAddIndex = currentTracks.indexOf(track);

      Spotify.addTracks(this.state.currentPlaylistId, currentTracks[trackToAddIndex].uri);
      this.handleOpenSnackbar(`${track.name} by ${track.artist} Added`)
      newTracks.push(track);

    }
    this.setState({ playlistTracks: newTracks });
  }

  removeTrack(track){
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

  handleOpenSnackbar = (message) => {
    this.setState({snackbarOpen: true, snackbarMessage: message});
  }

  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false});
  }

  /* Updates the playlistName state when the input field changes */
  updatePlaylistName(name){
      this.setState({playlistName: name})
  }

  savePlaylist = async () => {
    const trackURIs = this.state.playlistTracks.map(a => a.uri);
    await Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }
  
  createPlaylist() {
    Spotify.createPlaylist(this.state.playlistName).then(this.sleeper(2000)).then(() => {
      this.getPlaylists()
      this.handleOpenSnackbar(`${this.state.playlistName} Playlist created`)
    })
  }

  getPlaylists(){
    Spotify.getPlaylists().then(playlist => {
      this.setState({Playlists: playlist})
    })
  }

  getPlaylistTracks(playlistId){
    Spotify.getPlaylistTracks(playlistId).then(tracks =>{
      this.setState({playlistTracks: tracks, currentPlaylistId: playlistId});
      console.log(this.state.currentPlaylistName)
    })
  }


  searchSpotify(term){
    if(term){
      Spotify.search(term).then(track => {
        this.setState({searchResults: track},this.handleOpenSnackbar('Search Successful'));
      })    
    }else{
      this.handleOpenSnackbar('Please enter a song or artist');
    }
  }

  render() {
    if(!this.state.hasAccessToken){
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="ConnectBar">
            <p>To connect your Spotify Account please click the button below.</p>
            <Button color="primary" variant="outlined" onClick={this.handleRedirect}>CONNECT SPOTIFY</Button>       
          </div>
        </div>
        )
    }
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App"> 
          <SearchBar onSearch={this.searchSpotify} />
            <div className="App-playlist">
              <UserPlaylistSearch onNameChange={this.updatePlaylistName} onAdd={this.createPlaylist} onGetTracks={this.getPlaylistTracks} onGetPlaylists={this.getPlaylists} userPlaylists={this.state.Playlists} />
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks}/>
              <Snackbar 
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                action={[
                  <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackbar}>
                    CLOSE
                </Button>
              ]}
            autoHideDuration={4000}
            open={this.state.snackbarOpen} 
            onClose={this.handleCloseSnackbar} 
            message={this.state.snackbarMessage}
          />
          </div>
        </div>
      </div>
        
    );
  }}

export default App;
