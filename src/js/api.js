let apiKey = "ec136557";

let request = new XMLHttpRequest();


function apiRequest(reqParam){
    requestURL = "https://www.omdbapi.com/" + reqParam + "&type=movie&apikey=" + apiKey + "";
    request.open("GET", requestURL);
    request.send();
    request.onload = () =>{
        console.log(request);
        if(request.status === 200){
            return JSON.parse(request.response);
        }
        else{
            return "ERROR";
        }
    }
} 