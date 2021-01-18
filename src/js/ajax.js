$(document).ready(function() {
    myCookieVal = getCookie(myCookie);


    if(myCookieVal !== undefined && myCookieVal !== null){
        let cookieArr = myCookieVal.split(",");
        console.log(cookieArr);

        for(let val in cookieArr){
            //addNomination(val);
            console.log(val);
        }
    }
    else{
        myCookieVal = "";
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