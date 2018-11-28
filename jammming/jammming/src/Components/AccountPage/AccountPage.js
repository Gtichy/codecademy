import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Spotify from '../../util/Spotify';

import './AccountPage.css';
    
class AccountPage extends Component {
    state = {
        currentUserInfo: {
            name: '',
            image: '',
            totalFollowers: ''
        }
    }
    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo = () => {
        Spotify.getUserInfo().then(userInfo => {
          this.setState({currentUserInfo: userInfo});
          console.log(this.state.currentUserInfo);
        })
      }
      
    render(){
        return (
            <div>
                <Navigation />
                <div className="App"> 
                    <div className="AccountInfo">
                        <img src={this.state.currentUserInfo.image}/>
                        <h2>{this.state.currentUserInfo.name}</h2>
                        <p>{this.state.currentUserInfo.totalFollowers} Followers</p>
                        <div className="PlayHistory">
                        {Spotify.getUserPlayHistory()}
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default AccountPage;