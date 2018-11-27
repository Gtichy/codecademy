import React, { Component } from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Spotify from '../../util/Spotify';
import './Navigation.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Navigation extends Component {
  state = {
    searchTerm: '',
    currentUserInfo: {
      image: ''
    }
  };

  componentDidMount() {
    this.getUserInfo();
  }

  search = () =>{
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange = (event) => {       
    this.setState({searchTerm: event.target.value})
}

getUserInfo = () => {
  Spotify.getUserInfo().then(userInfo => {
    this.setState({currentUserInfo: userInfo});
    console.log(this.state.currentUserInfo);
  })
}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            
            <h1><Link to='/'>Ja<span className="highlight">mmm</span>ing</Link></h1>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <div className="profileImage">
                  <Link to='/account'><img alt="profilepic" src={this.state.currentUserInfo.image} /></Link>
                </div>

              </IconButton>

            </div>
            <div className={classes.sectionMobile}>
            <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <div className="profileImage">
                <img alt="profilepic" src={this.state.currentUserInfo.image} />
                </div>
              </IconButton>

            </div>
          </Toolbar>
        </AppBar>
      </div>      
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
