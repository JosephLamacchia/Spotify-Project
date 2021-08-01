
    let xhr = new XMLHttpRequest();
    access_token = localStorage.getItem("access_token");
url = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=784b9af0ff948ec7837257dcc9c5d92b"
    xhr.open("GET", url, true);   
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            let c =this.responseText;

            c = JSON.stringify(c);

            window.localStorage.setItem('forcast',c);

        }}
    
  

    let b = window.localStorage.getItem('forcast');

    document.getElementById('par').innerHTML = b;


