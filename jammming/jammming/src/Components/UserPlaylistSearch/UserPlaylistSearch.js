import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


import './UserPlaylistSearch.css';
import UserPlaylists from '../UserPlaylists/UserPlaylists';

class UserPlaylistSearch extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            dialogOpen: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleOpenDialog = () => {
        this.setState({dialogOpen: true})
    }

    handleSubmit = () => {
        this.props.onAdd()
        this.setState({dialogOpen: false})
    }
    handleCloseDialog = () => {
        this.setState({dialogOpen: false})
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render(){
        const { fullScreen } = this.props;
        return (           
            <div className="UserPlaylists">
            <h2>Your Playlists</h2>
            <Button className="addButton" onClick={this.handleOpenDialog} mini variant="outlined" color="primary" aria-label="Add" >
                Create New Playlist
             </Button>

            <UserPlaylists onGetTracks={this.props.onGetTracks} playlists={this.props.userPlaylists} />  

            <Dialog
                fullScreen={fullScreen}
                open={this.state.dialogOpen}
                onClose={this.handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">{"Create A New Playlist"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To create a new playlist fill out the form below and hit submit.  
                    </DialogContentText>
                    <TextField
                    id="standard-textarea"
                    placeholder="New Playlist Name"
                    multiline
                    margin="normal"
                    onChange={this.handleNameChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary" autoFocus>
                    Create
                </Button>
          </DialogActions>
        </Dialog>
            </div>
        )
        
    }
}
export default UserPlaylistSearch;