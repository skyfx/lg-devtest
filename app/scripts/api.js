(function apiModule(global) {
    'use strict';

    global.api = {
        hello: 'world',
        getMovieList: getMovieList,
        filterMovies: filterMovies,
        sortMovies: sortMovies
    };

    function getMovieList() {
        return [{img: 'dummy'}];
    }

    function filterMovies(movieList, genre) {
        console.log('Filtering', genre);
        return movieList;
    }

    function sortMovies(movieList) {
        return movieList;
    }
})(this);
