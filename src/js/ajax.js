$(document).ready(function() {
    nomList = JSON.parse(getCookie(myCookie));
    
    setInterval(function() {
        setCookie(myCookie, nomList, 7);
    }, 100);

    if(nomList !== undefined && nomList !== null){
        console.log(nomList);

        for(movie in nomList){
            displayNominatedMovie(nomList[movie]);
            console.log(nomList[movie]);
        }
    }
    else{
        nomList = {};
    }
    
    $('#searchParam').oninput = function(){
        let movieAttr = $('input[name="searchparam"]').val();

        $('#searchResults').html("");

        if(movieAttr.substring(0, 2) == "tt"){
            searchMovieByID(movieAttr);  
        }
        else{
            searchMovieByTitle(movieAttr);   
        }
        
    };
});