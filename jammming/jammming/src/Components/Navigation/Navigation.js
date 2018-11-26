import React, { Component } from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './Navigation.css';

import AccountPage from '../AccountPage/AccountPage';

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
    searchTerm: ''
  };

  search = () =>{
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange = (event) => {       
    this.setState({searchTerm: event.target.value})
}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            </Typography>
            <div className={classes.search}>
              <Input
                placeholder="Search Spotify"
                disableUnderline
                onChange={this.handleTermChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />

            </div>
            <IconButton color="inherit" onClick={this.search}>
                <SearchIcon />
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Router>

                <div className="profileImage">
                  <Link to='/account'><img alt="profilepic" src={this.props.profileImage.image} /></Link>
                </div>
                </Router>

              </IconButton>

            </div>
            <div className={classes.sectionMobile}>
            <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <div className="profileImage">
                <img alt="profilepic" src={this.props.profileImage.image} />
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
