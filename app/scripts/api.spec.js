describe('api module', function() {
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

    describe('data fetching', function() {

        var movieList;

        beforeEach(function(done) {
            api.getMovieList(function(error, data) {
                movieList = data;
                done();
            });
        });

        it('should fetch data from the remote server', function() {

            var listItem;

            expect(movieList.length).toBeGreaterThan(0);

            listItem = movieList[0];

            expect(listItem.img).toMatch(/png$/);

        });

    });

    it('should only return "Action" titles', function() {

        var filteredList = api.filterMovies(movieListStub, 'action');

        expect(filteredList.length).toBe(1);
    });

    it('should sort by IMDB rating', function() {

        var sortedList = api.sortMovies(movieListStub);

        expect(sortedList[0].imdb).toBe(7.2);
        expect(sortedList[1].imdb).toBe(2.4);
        expect(sortedList[2].imdb).toBe(1.4);
    });
});
