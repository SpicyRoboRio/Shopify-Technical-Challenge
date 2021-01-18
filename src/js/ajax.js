$(document).ready(function() {
    myCookieVal = getCookie(myCookie);
    myCookieVal = myCookieVal.replace(/\"/g, '');


    if(myCookieVal !== undefined && myCookieVal !== null){
        let cookieArr = myCookieVal.split(",");

        console.log(cookieArr);

        for(i = 0; i < cookieArr.length; i++){
            apiRequest("?i=" + cookieArr[i], getNominatedMovie);
            console.log(cookieArr[i]);
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