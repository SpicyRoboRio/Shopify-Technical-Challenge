let apiKey = "8d1cfd0a";

let request = new XMLHttpRequest();
let nomList = {};
let myCookie = "spicyroborio_nom_list";
let myCookieVal = "";
let pageNum = 1;
let maxPages = 1;
let resPerPage = 10; //max number of results shown on a search page (default = 10)

//Send APIRequest to retrieve movie data
function apiRequest(reqParam, handleData){
    let requestURL = "https://www.omdbapi.com/" + reqParam + "&type=movie&apikey=" + apiKey;

    $.ajax({
        type: "GET",
        url: requestURL,
        dataType: "json",
        success: function (data) {
            handleData(data);
        },
        fail: function(error) {
            console.log(error); 
        }
    });
} 

//Search OMDB for movies by title
function searchMovieByTitle(movieTitle){
    apiRequest("?s=" + movieTitle + "&page=" + pageNum, displaySearchData);
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
            maxPages = Math.ceil(parseInt(reqResults["totalResults"], 10)/resPerPage);
            for(i = 0; i < reqResults["Search"].length; i++){
                currResult = reqResults["Search"][i];
                addSearchResult(currResult["Title"], currResult["Year"], currResult["imdbID"], i);
            }
        }
        else{
            addSearchResult(reqResults["Title"], reqResults["Year"], reqResults["imdbID"], 0);
        }
        //pagination if there are more than 1 page
        if(maxPages > 1){
            let searchResCont = "<div id='pagination'>";
            if(pageNum > 1){
                searchResCont += "<input id='prevBtn' type='button' value='Prev Page' onclick='prevPage()'></input>";
            }
            searchResCont += "<i id='pageDetails'>Page " + pageNum + " of " + maxPages + "</i>"
            if(pageNum < maxPages){
                searchResCont += "<input id='nextBtn' type='button' value='Next Page' onclick='nextPage()'></input>";
            }
            searchResCont += "</div>";
            $('#searchResults').append(searchResCont);
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
        let searchResCont = "<div id='movie" + imdbID + "' imdbID='" + imdbID + "'>\
                                <span>" + movieTitle + ",<i>(" + movieYear + ")</i></span>\
                            </div>";
        $('#searchResults').append(searchResCont);
    }
    else{
        let searchResCont = "<div id='movie" + imdbID + "' imdbID='" + imdbID + "'>\
                                <span>" + movieTitle + ", <i>(" + movieYear + ")</i></span>\
                                <input id='nominateBtn" + imdbID + "' class='float-right' type='button' value='Nominate'>\
                            </div>";

        $('#searchResults').append(searchResCont);

        document.getElementById("nominateBtn" + imdbID).onclick = function(m, movieID=imdbID){
            if(Object.keys(nomList).length >= 5){
                alert("Max of 5 Nominations!");
            }
            else{
                addNomination(movieID);
                if(document.getElementById("nominateBtn" + imdbID) !== null){
                    document.getElementById("nominateBtn" + imdbID).remove();
                }
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
        setCookie(myCookie, myCookieVal, 7);
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
                            <input id='denominateBtn" + movieJSON["imdbID"] + "' class='float-right' type='button' value='Remove'>\
                        </div>";

    $('#nominationList').append(nomListcont);

    document.getElementById("denominateBtn" + movieJSON["imdbID"]).onclick = function(m, movieID=movieJSON["imdbID"]){
        delete nomList[movieJSON["imdbID"]];
        setCookie(myCookie, myCookieVal, 7);
        if(document.getElementById(movieID) !== null){
            document.getElementById(movieID).remove();
        }
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

function setCookie(name,value,days) {
    let expires = "";

    myCookieVal = "";

    for(let nomination in nomList){
        if(myCookieVal === ""){
            myCookieVal += nomination;
        }
        else{
            myCookieVal += "," + nomination;
        }
    }

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + JSON.stringify(value)  + expires + "; path=/";
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function prevPage(){
    pageNum--;
    let movieTitle = $('input[name="searchparam"]').val();

    $('#searchResults').html("");
    searchMovieByTitle(movieTitle);
}

function nextPage(){
    pageNum++;
    let movieTitle = $('input[name="searchparam"]').val();

    $('#searchResults').html("");
    searchMovieByTitle(movieTitle);
}