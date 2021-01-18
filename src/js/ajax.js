$(document).ready(function() {
    //nomList = JSON.parse(getCookie(myCookie));
    myCookieVal = getCookie(myCookie);

    for(let val in myCookieVal){
        addNomination(val);
    }

    /*if(nomList !== undefined && nomList !== null){
        console.log(nomList);

        for(movie in nomList){
            displayNominatedMovie(nomList[movie]);
            console.log(nomList[movie]);
        }
    }
    else{
        nomList = {};
    }*/

    $('#searchParam').on("input", function(e){
        let movieAttr = $('input[name="searchparam"]').val();
        console.log(movieAttr);

        $('#searchResults').html("");
        pageNum = 1;

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