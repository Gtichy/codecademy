import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    search(){
        this.props.onSearch(this.state.searchTerm);
    }

    handleTermChange(event) {       
        this.setState({searchTerm: event.target.value})
    }

    /* Method handle if user presses enter on the text field rather than clicking the button */
    handleEnter(event){
        if(event.key === 'Enter'){
            this.search();
        }
    }
    
    render() {
        return (
        <div className="SearchBar">
            <input onChange={this.handleTermChange} onKeyPress={this.handleEnter} placeholder="Enter A Song, Album, or Artist" />
            <div className="SearchButtons">
              <button onClick={this.search}>SEARCH</button>
            </div>
        </div>
        )
    }    
}

export default SearchBar;