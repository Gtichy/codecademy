
let accessToken;
let expiresIn;
const clientID = '1ae830999353421e827d44905a2f3198';
const redirectURI = 'http://localhost:3000/';

const Spotify = {

    getAccessToken(){
        const URL = window.location.href;
        const regexAccessToken =  'access_token=([^&]*)';
        const regexExpiresIn = 'expires_in=([^&]*)';
        
        const urlAccessToken = URL.match(regexAccessToken);
        const urlExpiresIn = URL.match(regexExpiresIn);
        console.log(urlAccessToken);

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
                console.log(accessToken);
            }, urlExpiresIn[1] * 1000);
        }else{
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    }
}   

export default Spotify;