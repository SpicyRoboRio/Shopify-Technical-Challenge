$(document).ready(function() {
    nomList = JSON.parse(getCookie(myCookie));
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
    
    $('#searchForm').submit(function(e){
        e.preventDefault();
        let arr = $('#searchForm').serializeArray();
        let movieAttr = arr[0].value;

        $('#searchResults').html("");

        if(movieAttr.substring(0, 2) == "tt"){
            searchMovieByID(movieAttr);  
        }
        else{
            searchMovieByTitle(movieAttr);   
        }
        
    });
});