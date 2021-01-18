$(document).ready(function() {
    let cookieVal = getCookie(myCookie);

    let searchParam = urlParams.get('search');
    let nominationParam = urlParams.get('nominations');

    
    if(searchParam !== null){
        console.log(searchParam);
        $('input[name="searchparam"]').val(searchParam);

        $('#searchResults').html("");
        pageNum = 1;

        if($('input[name="searchparam"]').val() !== ""){    
            if(searchParam.substring(0, 2) == "tt"){
                searchMovieByID(searchParam);  
            }
            else{
                searchMovieByTitle(searchParam);   
            }
        }
    }
    
    if(nominationParam !== null){
        console.log(nominationParam);
    }

    if(cookieVal !== undefined && cookieVal !== null){
        let cookieArr = cookieVal.split(",");

        console.log(cookieArr);

        for(i = 0; i < cookieArr.length; i++){
            apiRequest("?i=" + cookieArr[i], getNominatedMovie);
            console.log(cookieArr[i]);
        }
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