let apiKey = "ec136557";

let request = new XMLHttpRequest();
let nomList = {};

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
    if(isNominated(imdbID)){
        let searchResCont = "<form id='nominateForm' ref='nominateForm'>\
                            <div id='movie" + imdbID + "' imdbID='" + imdbID + "'>\
                                <span>" + movieTitle + ",<i>(" + movieYear + ")</i></span>\
                            </div>\
                        </form><br>";
        $('#searchResults').append(searchResCont);
    }
    else{
        let searchResCont = "<form id='nominateForm' ref='nominateForm'>\
                                <div id='movie" + imdbID + "' imdbID='" + imdbID + "'>\
                                    <span>" + movieTitle + ",<i>(" + movieYear + ")</i></span>\
                                    <div class='form-group'>\
                                        <input id='nominateBtn" + imdbID + "' type='button' value='Nominate'>\
                                    </div>\
                                </div>\
                            </form><br>";

        $('#searchResults').append(searchResCont);

        document.getElementById("nominateBtn" + imdbID).onclick = function(m, movieID=imdbID){
            if(Object.keys(nomList).length >= 5){
                alert("Max of 5 Nominations!");
            }
            else{
                addNomination(movieID);
                document.getElementById("nominateBtn" + movieID).remove();
            }
        };
    }
}

function addNomination(movieID){
    if(!isNominated(movieID)){
        apiRequest("?i=" + movieID, getNominatedMovie);
    }
    else{
        alert("This movie has already been nominated");
    }
}

function getNominatedMovie(reqResults){
    console.log("HANDLING DATA:");
    console.log(reqResults);

    if(reqResults["Response"] != "False"){
        nomList[reqResults["imdbID"]] = reqResults;
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
                            <span>" + movieJSON["Title"] + ",<i>(" + movieJSON["Year"] + ")</i></span>\
                            <input id='denominateBtn" + movieJSON["imdbID"] + "' type='button' value='Remove'>\
                            <br>\
                        </div>";

    $('#nominationList').append(nomListcont);

    document.getElementById("denominateBtn" + movieJSON["imdbID"]).onclick = function(m, movieID=movieJSON["imdbID"]){
        delete nomList[movieJSON["imdbID"]];
        document.getElementById(movieID).remove();
    };
}

function isNominated(movieID){
    if(nomList[movieID] === undefined){
        return false;
    }
    else{
        return true;
    }
}