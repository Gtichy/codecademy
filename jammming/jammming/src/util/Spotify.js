let accessToken;
let userId;
let expiresIn;
let playlistID;

const clientID = '1ae830999353421e827d44905a2f3198';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    search(searchTerm){
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{ 
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if(response.ok){
                console.log('Success');
                return response.json();     
            }
        }).then(jsonResponse => {
            if(jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
            }
            })
    },

    getPlaylists(){
         return fetch(`https://api.spotify.com/v1/me/playlists`,{ 
             headers: { 
                 Authorization: `Bearer ${accessToken}` }
                } 
        )
        .then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse){
                    return jsonResponse.items.map(playlist => ({
                        id: playlist.id,
                        name: playlist.name,
                        uri: playlist.uri,
                        trackCount: playlist.tracks.total,
                        image: playlist.images.length < 1 ? 'https://wearehygge.com/playlist.jpg' : playlist.images[0].url
                        }
                    ))
                }
            }  
    )},

    getPlaylistTracks(playlistId){
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,  { headers: { Authorization: `Bearer ${accessToken}` }} )
        .then(response =>{
            if(response.ok){
              return response.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse){
                console.log(jsonResponse);
                return jsonResponse.items.map(item => ({
                    album: item.track.album.name,
                    name: item.track.name,
                    id: item.track.id,
                    artist: item.track.artists[0].name,
                    uri: item.track.uri
                }))
            }
        })
    },

    getUserId(){
        return fetch('https://api.spotify.com/v1/me', { headers: { Authorization: `Bearer ${accessToken}` }} )
            .then(response =>{
                if(response.ok){
                    console.log('user id success');
                    return response.json();
                }
            }).then(jsonResponse => {
                if(jsonResponse){
                    console.log('we got a response')
                    userId = jsonResponse.id;
                    console.log('Success: ' + userId);
                    return userId;  
                }
            })
    },

    createPlaylist(playlistName){
        return this.getUserId().then(
            userId => {
                console.log('Playlist name: ' + playlistName);
                fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                 {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": playlistName,
                        "public": true }),
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                   }
             })
         })
    },

    addTracks(currentPlaylistId, tracks){
        return fetch(`https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks?uris=${tracks}`,
            { 
                method: 'POST',
                headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
                }   
            })  
    },

    removeTracks(currentPlaylistId, tracks){  
        return fetch(`https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`,
            { 
                method: 'DELETE',
                body: JSON.stringify({
                    "tracks":[{
                    "uri": tracks
                    }]
                }),
                headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
                }   
            }
    )},


    savePlaylist(playlistName, trackURI){
        this.getUserId().then(
            userId => {
                console.log('Playlist name: ' + playlistName);
                fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                 {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": playlistName,
                        "public": true }),
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                   }
                }).then(response => {
                    if(response.ok){
                        console.log(response.json);
                        return response.json();
                    }
                }).then(jsonResponse => {
                    if(jsonResponse){
                        playlistID = jsonResponse.id;
                        console.log(playlistID);
                        return playlistID;
                    }
                }).then(playlistID => {
                    console.log('Adding Tracks');
                    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, 
                    {
                        method: 'POST',
                        body: JSON.stringify({ 
                            uris: trackURI
                        }),
                         headers: { 
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                         }
                    })
                })
            })
    },

    redirect(){
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    },

    getAccessToken(){
        const URL = window.location.href;
        const regexAccessToken =  'access_token=([^&]*)';
        const regexExpiresIn = 'expires_in=([^&]*)';
        
        const urlAccessToken = URL.match(regexAccessToken);
        const urlExpiresIn = URL.match(regexExpiresIn);

        /* Check if URLaccessToken exists (it's an arroy) */
        /* Check if it has a length greater than 0 */
        /* Check if it has an index of 1 */ 
        if(urlAccessToken && urlAccessToken.length > 0 && urlAccessToken[1]){
            accessToken = urlAccessToken[1];
            if(urlExpiresIn && urlExpiresIn.length > 0 && urlExpiresIn[1]){
                expiresIn = urlExpiresIn[1];
            }

            window.setTimeout(() => {
                window.history.pushState('Access Token', null, '/')
                accessToken = null
            }, urlExpiresIn[1] * 1000);

            return accessToken;
        }
        return null;
    }
}   

export default Spotify;