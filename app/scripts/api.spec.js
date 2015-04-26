describe('api api', function () {
    'use strict';

    var movieListStub = [
        {
            id: 'quantum_of_solace',
            title: 'Quantum of Solace',
            genre: 'Action',
            imdb: 1.4,
            img: 'https://lg-devtest.herokuapp.com/images/box_quantum_of_solace.png'
        }, {
            id: 'slumdog_millionaire',
            title: 'Slumdog Millionaire',
            genre: 'Drama',
            imdb: 7.2,
            img: 'https://lg-devtest.herokuapp.com/images/box_slumdog_millionaire.png'
        },
        {
            id: 'The_Kings_speech',
            title: 'The King\'s speech',
            genre: 'Biography',
            imdb: 2.4,
            img: 'https://lg-devtest.herokuapp.com/images/box_the_kings_speech.png'
        }];

    it('should fetch data from the remote server', function() {

        var movieList = api.getMovieList();
        var listItem;

        expect(movieList.size).toBeGreaterThan(0);

        listItem = movieList[0];

        expect(listItem.img).toMatch(/png$/);

    });

    it('should only return "Action" titles', function() {

        var filteredList = api.filterMovies(movieListStub, 'action');

        expect(filteredList.size).toBe(1);
    });

    it('should sort by IMDB rating', function() {

        var sortedList = api.sortMovies(movieListStub);

        expect(sortedList[0].imdb).toBe(1.4);
        expect(sortedList[1].imdb).toBe(2.4);
        expect(sortedList[2].imdb).toBe(7.2);
    });
});
