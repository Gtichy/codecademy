import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
                <TextField
                    id="outlined-name"
                    label="Search Spotify"
                    placeholder="Enter a Song, Album, or Artist"
                    onChange={this.handleTermChange}
                    margin="normal"
                    variant="outlined"
                />
            <Button color="primary" variant="outlined" onClick={this.search}>SEARCH</Button>
        </div>
        )
    }    
}

export default SearchBar;