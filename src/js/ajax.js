$(document).ready(function() {
    $('#searchForm').submit(function(e){
        e.preventDefault();
        let movieAttr = document.getElementById("searchParam").getAttribute("value");

        searchMovieByTitle(movieTitle);   
    });
});