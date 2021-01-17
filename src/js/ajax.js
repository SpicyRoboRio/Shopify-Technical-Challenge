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

    $('#searchParam').on("input", function(e){
        let movieAttr = $('input[name="searchparam"]').val();
        console.log(movieAttr);

        $('#searchResults').html("");

        if($('input[name="searchparam"]').val() !== ""){    
            if(movieAttr.substring(0, 2) == "tt"){
                searchMovieByID(movieAttr);  
            }
            else{
                searchMovieByTitle(movieAttr);   
            }
        }
        
    });

});