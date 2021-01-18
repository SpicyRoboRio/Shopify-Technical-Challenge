$(document).ready(function() {
    let cookieVal = getCookie(myCookie);

    let searchParam = urlParams.get('search');
    let pageParam = urlParams.get('page');
    let nominationParam = urlParams.get('nominations');

    
    if(searchParam !== null){
        if(pageParam !== null){
            pageNum = parseInt(pageParam, 10);
        }
        else{
            pageNum = 1; 
        }

        $('input[name="searchparam"]').val(searchParam);

        $('#searchResults').html("");
        

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
        cookieVal = nominationParam;
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

    $('#shareBtn').onclick = function (e){
        searchParam = $('input[name="searchparam"]').val();
        pageParam = pageNum.toString();
        nominationParam = getCookie(myCookie);    
        
        let link = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?search=" + searchParam + "&page=" + pageParam + "&nominations=" + nominationParam;
        $('input[name="shareLink"]').val(link);
        let linkElem = document.getElementById("shareLink");

        console.log(link);
        linkElem.select();
        linkElem.setSelectionRange(0, 99999);
        document.execCommand("copy");
    };
});