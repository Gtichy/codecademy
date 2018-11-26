import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Spotify from '../../util/Spotify';
import theme from '../../Theme/Theme';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
      
    this.state = {
      hasAccessToken: false,
      snackbarMessage: '',
    }
  }

  componentDidMount(){
    this.handleAccessToken();
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
    }else {
      return (
        <MuiThemeProvider theme={theme}>
        <Router>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path='/account' component={AccountPage} />
        </div>   
        </Router>

        </MuiThemeProvider>   
      );     
    }  
  }
}

export default App;