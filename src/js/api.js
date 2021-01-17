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
    apiRequest("?s=" + movieTitle, handleAPIData);
}

//Search OMDB for movies by ID
function searchMovieByID(movieID){
    apiRequest("?i=" + movieID, handleAPIData);
}

// handle data retrieved from OMDB DB and display movie title and name(API Request Callback)
function handleAPIData(reqResults){
    console.log("HANDLING DATA:");
    console.log(reqResults);

    if(reqResults["Response"] != "False"){
        if(reqResults["Search"] !== undefined){
            
            for(i = 0; i < reqResults["Search"].length; i++){
                currResult = reqResults["Search"][i];
                addSearchResult(currResult["Title"], currResult["Year"], i);
            }
        
        }
        else{
            addSearchResult(reqResults["Title"], reqResults["Year"], 0);
        }
    }
    else if(reqResults["Response"] != "False"){
        console.log(reqResults["Error"]);
    }
    else{
        console.log("Error Getting Data");
    }
}

function addSearchResult(movieTitle, movieYear, num){
    let searchResCont = "<div id='movie'" + num + ">\
                            <p id='movieTitle'>" + movieTitle + "</p>\
                            <br>\
                            <p id='movieYear'>" + movieYear + "</p>\
                            <br>\
                            <input id='nominateBtn' type='button' value='Nominate'>\
                        </div>";

    $('#searchResults').append(searchResCont);
}