import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';

class App extends Component {
  render() {
    return (
      <div class="App">
        <h1>ravenous</h1>

        <SearchBar/>
        <BusinessList/>

      </div>
    );
  }
}

export default App;