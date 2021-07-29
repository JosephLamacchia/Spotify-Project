

redurl ='http://127.0.0.1:5500/spot.html';



const auth ='https://accounts.spotify.com/authorize';

const TOKEN = 'https://accounts.spotify.com/api/token';

var access_token = null;
var refresh_token = null;


let o =function onPageLoad(){
    
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        console.log("Handle redirect called")
        handleRedirect();

    }
    else{f()}
  
    }
 let f = function requestAuthorization(){

    console.log("Authorization requested :");
    client_id = '5096d8ce0a754586a7ec216c3ea7d02e';
    client_secret = 'fc55ba01b9d743e58ac01619f2f61748';
    localStorage.setItem("client_id",client_id);
    localStorage.setItem("client_secret",client_secret);
    let url = auth
    url+= "?client_id=" +client_id;
    url+= "&response_type=code";
    url+= "&redirect_uri="+encodeURI(redurl);
    url+= "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
     
}

 function handleRedirect(){

    let code = getCode();
    console.log("code : " + code);
    fetchAccess(code);
    window.history.pushState("","",redurl);

}

 let fetchAccess =function fetchAccessToken(code){
    let body = "grant_type=authorization_code";
    body+= "&code="+code;
    body+= "&redirect_uri=" + encodeURI(redurl);
    body+= "&client_id=" + client_id;
    body+= "&client_secret=" + client_secret;
    console.log("body :" + body);
    h(body);
}

let fetchRefresh = function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    console.log("refresh_token :" + refresh_token)
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    h(body);
}

 let h = function callAuthorizationApi(body){
    let req = new XMLHttpRequest();
    req.open("POST",TOKEN,true);
    console.log("Client_id: " + client_id);
    console.log("Client_secret: " + client_secret);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.setRequestHeader('Authorization','Basic' + btoa(client_id+ ":"+ client_secret));
    req.send(body);
    req.onload = g();

}


let g =function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            console.log("Access Token :" + access.token)

            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            console.log("Refresh Token :" + refresh_token)
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}


function getCode(){
    let code  = null;
    const queryString = window.location.search;

    if(queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString)
        code = urlParams.get('code');
    }

    return code;
}

function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    access_token = localStorage.getItem("access_token");

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}
function handlePlaylistsResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "playlists" );
        data.items.forEach(item => addPlaylist(item));
        document.getElementById('playlists').value=currentPlaylist;
    }
    else if ( this.status == 401 ){
        fetchRefresh()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

