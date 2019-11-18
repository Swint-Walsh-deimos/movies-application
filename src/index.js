/**
 * es6 modules and imports
 */
import {sayHello} from './hello.js';
sayHello('World');

// import {getMovies} from './api.js';
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

/**
 * require style imports
 */
// const {getMovies} = require('./api.js');

//---------------------generate cards----------------------
function makeCard(title, rating){
  let card;
  card = "";
  card += `<div class="card">`;
  card += `<div class="card-body">`;
  card += `<p class="card-text">${title}, ${rating}</p>`;
  card+= `<div><i class="fas fa-edit"/><i class="fas fa-trash-alt"/></div>`;
  card += `</div></div>`;
  document.getElementById("card-container").innerHTML += card;
}


//function that grabs and displays movies/movie info
getMovies().then((movies) => {
  $('#preloader').html("");
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, ${id}}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    let newTitle = `${title}`;
    let newRating = `${rating}`;
    makeCard(newTitle, newRating);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// getMovie(1)
//     .then(movie => {
//       console.log("Making a request to a single movie");
//       console.log(`${movie.title} by ${movie.rating}`);
//     })
//     .catch(() => console.log('The important thing is you tried...'));

 postMovie({
  "title": "Movie title",
  "rating": "1"
}).then(getMovies).then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating}) => {
    console.log(`${title} ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// patchMovie({
//   "title": "title",
//   "rating": "5"
// }, 3).then(getMovies).then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating}) => {
//     console.log(`${title} ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });
//
// deleteMovie(4).then(getMovies).then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating}) => {
//     console.log(`${title} ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });
