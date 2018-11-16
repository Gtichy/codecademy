import React, { Component } from 'react';
const token = '';

const Spotify = {

    getAccessToken(){
        const URL = 'https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123';
        const regex =  '/access_token=([^&]*)/';
        if(token){
            return token;
        }else{
            token = URL.match(regex);
            console.log(token);
        }
    }
}   

export default Spotify;