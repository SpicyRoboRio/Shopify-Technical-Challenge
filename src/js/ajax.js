$(document).ready(function() {
    myCookieVal = getCookie(myCookie);

    

    if(nomList !== undefined && nomList !== null){
        console.log(myCookieVal);

        for(let val in myCookieVal){
            //addNomination(val);
            console.log(val);
        }
    }
    else{
        myCookieVal = [];
    }

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