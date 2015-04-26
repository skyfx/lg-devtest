Lg code assignment
==================

[![Build Status](https://travis-ci.org/skyfx/lg-devtest.svg?branch=master)](https://travis-ci.org/skyfx/lg-devtest)

Implementation of a box art carousel fetching data from an external service.

Continuously deployed by travis at https://skyfx.github.io/lg-devtest

Run from source
---------------

  * clone repo
  * npm start
  * open browser 
  
Developed with:

  * node 0.12.2
  * npm 2.7.5
  * Chrome 42.0.2311.90 (64-bit), OS X 10.10.3 

The Rules
---------
  *  Your source code must be in JavaScript (e.g. not CoffeeScript);
  *  You can use any third party libraries, but we prefer you used plain JavaScript as much as possible;
  *  Show how you would "do it right".


Task requirements
-----------------
  *   Load data from http://lg-devtest.herokuapp.com/data.json, use the value xxx for the "Authorization" header.
  *   Filter only movies of type "Action", sort the results by IMDB rating (descending).
  *   Display the results in a horizontal "carousel", showing the box art image, the title, and the IMDB rating for each item.
  *   Adjust the width of the carousel so that only three items are visible at any given time.
  *   Implement mouse and keyboard navigation (arrow keys) to move the row of items to the left or right by one, animate the navigation using CSS transitions.
