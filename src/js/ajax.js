$(document).ready(function() {
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