(function apiModule(global) {
    'use strict';

    global.api = {
        getMovieList: getMovieList,
        filterMovies: filterMovies,
        sortMovies: sortMovies
    };

    function getMovieList(cb) {
        var result = [];

        var request = new XMLHttpRequest();
        request.open('GET', 'http://lg-devtest.herokuapp.com/data.json', true);
        request.setRequestHeader('Authorization', 'Bearer u12A8f3Zg');

        request.onload = function responseListener() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);

                data.data.forEach(function forEach(entry) {
                    result = result.concat(entry.assets);
                });

                cb(null, result);
            } else {
                cb('something went wrong');
            }
        };

        request.onerror = function errorListener() {
            cb('an error occurred');
        };

        request.send();
    }

    function filterMovies(movieList, genre) {
        var regex = new RegExp(genre, 'i');

        return movieList.filter(function filter(movie) {
            return movie.genre.match(regex);
        });
    }

    function sortMovies(movieList) {
        return movieList.sort(function sortDescending(a, b) {
            a = a.imdb;
            b = b.imdb;
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1;
            } else {
                return 0;
            }
        });
    }
})(this);
