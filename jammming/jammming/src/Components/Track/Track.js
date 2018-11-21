import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import './Track.css';

class Track extends Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }
    
    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    renderAction(){
        if(this.props.isRemoval){
            return (
                <IconButton color="secondary" onClick={this.removeTrack} aria-label="">
                <Icon>remove</Icon>
            </IconButton>
            )
        }else{
            return (
                <IconButton color="secondary" onClick={this.addTrack} aria-label="">
                    <Icon>add</Icon>
                </IconButton>
                )    
        }
    };

    render() {
            return (
                <div className="Track">
                    <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>
                    </div>
                    {this.renderAction()}
                </div>
            )
        }
}

export default Track;