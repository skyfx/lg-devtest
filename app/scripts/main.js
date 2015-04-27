(function main() {
    'use strict';

    var paneList = document.querySelector('.carousel .panes');
    var listItemTemplate = createListItemTemplate();

    api.getMovieList(function processMovies(error, movieList) {
        if (error) handleError(error);

        var filtered = api.filterMovies(movieList, 'action');
        var sorted = api.sortMovies(filtered);

        sorted.forEach(createListItem);
    });

    function createListItem(movie) {
        var newListItem = listItemTemplate.cloneNode(true);
        var img = newListItem.querySelector('img');

        newListItem.querySelector('h2').textContent = movie.title;
        newListItem.querySelector('p').textContent = movie.imdb;
        img.setAttribute('src', movie.img);
        img.setAttribute('alt', movie.title);

        paneList.appendChild(newListItem);
    }

    function handleError(error) {
        console.error('Oops something went wrong fetching data', error);
    }

    function createListItemTemplate() {
        var tmpDocument = document.implementation.createHTMLDocument();
        tmpDocument.body.innerHTML = '<li><h2>Title</h2><img><p>IMDB rating</p></li>';
        return tmpDocument.body.children[0];
    }

})();
