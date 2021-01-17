let apiKey = "ec136557";

let request = new XMLHttpRequest();

//Send APIRequest to retrieve movie data
function apiRequest(reqParam, handleData){
    let requestURL = "https://www.omdbapi.com/" + reqParam + "&type=movie&apikey=" + apiKey;

    $.ajax({
        type: "GET",
        url: requestURL,
        dataType: "json",
        success: function (data) {
            console.log("RESPONSE:");
            console.log(data);

            handleData(data);
        },
        fail: function(error) {
            console.log(error); 
        }
    });
} 

//Search OMDB for movies by title
function searchMovieByTitle(movieTitle){
    apiRequest("?t=" + movieTitle, handleAPIData);
}

// handle data retrieved from OMDB DB and display movie title and name(API Request Callback)
function handleAPIData(reqResults){
    console.log("HANDLING DATA:");
    console.log(reqResults);

    if(reqResults["Response"] != "False"){
        console.log(reqResults["Title"]);
        console.log(reqResults["Year"]);
    }
    else if(reqResults["Response"] != "False"){
        console.log(reqResults["Error"]);
    }
    else{
        console.log("Error Getting Data");
    }
}