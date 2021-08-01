
    let xhr = new XMLHttpRequest();
    access_token = localStorage.getItem("access_token");
url = " https://newsapi.org/v2/top-headlines?country=us&apiKey=e7410a73a6b04328a8cb804c1dc28b3c"
    xhr.open("GET", url, true);   
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            let c =this.responseText;

            console.log(c);
            c = JSON.stringify(c);
            console.log(c);


            window.localStorage.setItem('headlines',c);

        }}
    
  

    let b = window.localStorage.getItem('headlines');

    document.getElementById('par').innerHTML = b;
