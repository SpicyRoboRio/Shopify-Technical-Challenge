let apiKey = "ec136557";

let request = new XMLHttpRequest();


function apiRequest(reqParam){ //?i=tt3896198
    requestURL = "https://www.omdbapi.com/" + reqParam + "&apikey=" + apiKey + "";
    request.open("GET", requestURL);
    request.send();
    request.onload = () =>{
        console.log(request);
        if(request.status === 200){
            console.log(JSON.parse(request.response));
        }
    }
} 