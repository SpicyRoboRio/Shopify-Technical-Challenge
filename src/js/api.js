let apiKey = "ec136557";

let request = new XMLHttpRequest();
let nomList = [];

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
    apiRequest("?s=" + movieTitle, displaySearchData);
}

//Search OMDB for movies by ID
function searchMovieByID(movieID){
    apiRequest("?i=" + movieID, displaySearchData);
}

// handle data retrieved from OMDB DB and display movie title and name(API Request Callback)
function displaySearchData(reqResults){
    console.log("HANDLING DATA:");
    console.log(reqResults);

    if(reqResults["Response"] != "False"){
        if(reqResults["Search"] !== undefined){
            for(i = 0; i < reqResults["Search"].length; i++){
                currResult = reqResults["Search"][i];
                addSearchResult(currResult["Title"], currResult["Year"], currResult["imdbID"], i);
            }
        
        }
        else{
            addSearchResult(reqResults["Title"], reqResults["Year"], reqResults["imdbID"], 0);
        }
    }
    else if(reqResults["Response"] == "False"){
        console.log(reqResults["Error"]);
        $('#searchResults').html(reqResults["Error"]);
    }
    else{
        console.log("Error Getting Data");
        $('#searchResults').html("Error Getting Data");
    }
}

function addSearchResult(movieTitle, movieYear, imdbID, num){
    let searchResCont = "<form id='nominateForm' ref='nominateForm'>\
                            <div id='movie" + num + "' imdbID='" + imdbID + "'>\
                                <p id='movieTitle'>" + movieTitle + "</p>\
                                <p id='movieYear'>" + movieYear + "</p>\
                                <div  class='form-group'></div>\
                                    <input id='nominateBtn" + num + "' type='button' value='Nominate'>\
                                </div>\
                            </div>\
                        </form><br>";

    $('#searchResults').append(searchResCont);
    document.getElementById("nominateBtn" + num).onclick = function(m, movieID=imdbID){
        if(nomList.length >= 5){
            alert("Max of 5 Nominations!");
        }
        else{
            addNomination(movieID);
        }
    };
}

function addNomination(movieID){
    apiRequest("?i=" + movieID, getNominatedMovie);
}

function getNominatedMovie(reqResults){
    console.log("HANDLING DATA:");
    console.log(reqResults);

    if(reqResults["Response"] != "False"){
        nomList.push(reqResults);
        displayNominatedMovie(reqResults);
    }
    else if(reqResults["Response"] == "False"){
        console.log(reqResults["Error"]);
        alert(reqResults["Error"]);
    }
    else{
        console.log("Error Getting Data");
        alert("Error Nominating Movie");
    }
}

function displayNominatedMovie(movieJSON){
    let nomListcont = "<div id='" + movieJSON["imdbID"] + "'>\
                            <p id='movieTitle'>" + movieJSON["Title"] + "</p>\
                            <p id='movieYear'>" + movieJSON["Year"] + "</p>\
                            <input id='denominateBtn" + movieJSON["imdbID"] + "' type='button' value='Remove'>\
                        </div>\
                        <br>";

    $('#nominationList').append(nomListcont);

    document.getElementById("denominateBtn" + movieJSON["imdbID"]).onclick = function(m, movieID=movieJSON["imdbID"]){
        for(i = 0; i < nomList.length; i++){ 
            if(nomList[i] == movieID){ 
                nomList.splice(i, 1); 
            }
        }
        document.getElementById(movieID).remove();
    };
}