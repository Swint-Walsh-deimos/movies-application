/**
 * es6 modules and imports
 */
import {sayHello} from './hello.js';

sayHello('World');

const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');


//---------------------generate cards----------------------

let ID;
let card;


function makeCard(title, genre, rating, id, poster) {

    let card;
    card = "";
    card += `<div class="card">`;
    card += `<div class="card-body">`;
    card += `<p class="card-text mb-0">${title} <br> ${genre}<br> ${rating}</p>`;
    card += `<div class="mr-0" id="pictureHolder">`;
    card += `${poster}`;
    card += `</div>`;
    card += `<div id="">`;
    card += `<button> <i class="fas fa-edit editMovie" id="${id}" data-toggle="modal" data-target="#exampleModal2"></i></button>`;
    card += `<button class="deleteMovie" id="${id}"> <i class="fas fa-trash-alt" id="${id}"></i></button>`;
    card += `</div>`;
    card += `</div></div>`;
    document.getElementById("card-container").innerHTML += card;

    // $(".moviePoster").on("click", function () {
    //    $("#movieInfoTitle").html(`${title}`);
    //     // console.log(`${title}`);
    //     console.log($("this.title"));
    //     ID = $(this).attr("id");
    //     console.log(ID);
    //
    // });

    $('.deleteMovie').on('click', function (event) {
        if (confirm("Are you sure you'd like to delete this movie?")) {
            // $(".main-container").html("");

            let uniqueID = $(this).attr("id");
            console.log(uniqueID);
            console.log('trying to delete ' + uniqueID);
            deleteMovie(uniqueID).then(getMovies).then((movies) => {

                console.log('Here are all the movies:');
                movies.forEach(({title, rating}) => {
                    console.log(`${title} ${rating}`);
                });
                getMovies().then((movies) => {
                    $('#preloader').html("");
                    $(".card-container").html("");
                    $(".card-container").html(`<div id="addCard" data-toggle="modal" data-target="#exampleModal">
                                <div class="card"> 
                                    <i class="fas fa-plus"></i>
                                    <div class="card-body">
                                        <p class="card-text">Add Your Own</p>
                                    </div>
                                </div>
                            </div>`);
                    console.log('Here are all the movies:');
                    movies.forEach(({title, genre, rating, id, poster}) => {
                        console.log(`id#${id} - ${title} - rating: ${rating} - poster ${poster}`);
                        let newTitle = `${title}`;
                        let newGenre = `${genre}`;
                        let newRating = `${rating}`;
                        let newID = `${id}`;
                        let newPoster = `${poster}`;
                        makeCard(newTitle, newGenre, newRating, newID, newPoster);
                    });
                }).catch((error) => {

                });
            }).catch((error) => {

            });

            // location.reload();
        } else alert("Delete Cancelled")
    });


    //edit movie is name of class for modal,
    $('.editMovie').on('click', function (event) {
        ID = $(this).attr("id");
        console.log(ID);
        // let uniquetitle = $(this).attr("title");
        $("#saveEdit").on('click', function (event) {
            patchMovie(
                {
                    "title": $("#editMovieTitle").val(),
                    "rating": $("#editMovieRating").val()
                },
                ID).then(getMovies).then((movies) => {
                console.log('Here are all the movies:');
                movies.forEach(({title, rating}) => {
                    console.log(`${title} ${rating}`);
                });
            }).catch((error) => {

            });

            getMovies().then((movies) => {
                $('#preloader').html("");
                $(".card-container").html("");
                $(".card-container").html(`<div id="addCard" data-toggle="modal" data-target="#exampleModal">
                                <div class="card">
                                    <i class="fas fa-plus"></i>
                                    <div class="card-body">
                                        <p class="card-text">Add Your Own</p>
                                    </div>
                                </div>
                            </div>`);
                console.log('Here are all the movies:');
                movies.forEach(({title, genre, rating, id, poster}) => {
                    console.log(`id#${id} - ${title} - rating: ${rating} - poster ${poster}`);
                    let newTitle = `${title}`;
                    let newGenre = `${genre}`;
                    let newRating = `${rating}`;
                    let newID = `${id}`;
                    let newPoster = `${poster}`;
                    makeCard(newTitle, newGenre, newRating, newID, newPoster);
                });
            }).catch((error) => {

            });
        });

    });

}


// function displayGenre () {
//     let genre = movies.genre
//     if ($("#selectGenre").val() !== ${genre}) {
//         $(".card").toggle();
//     }
// }


//function that grabs and displays movies/movie info
getMovies().then((movies) => {
    $('#preloader').html("");
    $(".card-container").html("");
    $(".card-container").html(`<div id="addCard" data-toggle="modal" data-target="#exampleModal">
                                <div class="card"> 
                                    <i class="fas fa-plus"></i>
                                    <div class="card-body">
                                        <p class="card-text">Add Your Own</p>
                                    </div>
                                </div>
                            </div>`);
    console.log('Here are all the movies:');
    movies.forEach(({title, genre, rating, id, poster}) => {
        console.log(`id#${id} - ${title} - rating: ${rating} - poster ${poster}`);
        let newTitle = `${title}`;
        let newGenre = `${genre}`;
        let newRating = `${rating}`;
        let newID = `${id}`;
        let newPoster = `${poster}`;
        makeCard(newTitle, newGenre, newRating, newID, newPoster);
    });
}).catch((error) => {

});

// getMovie(1)
//     .then(movie => {
//       console.log("Making a request to a single movie");
//       console.log(`${movie.title} by ${movie.rating}`);
//     })
//     .catch(() => console.log('The important thing is you tried...'));


// patchMovie({
//     "title": "title",
//     "rating": "5"
// }, 3).then(getMovies).then((movies) => {
//     console.log('Here are all the movies:');
//     movies.forEach(({title, rating}) => {
//         console.log(`${title} ${rating}`);
//     });
// }).catch((error) => {
//     alert('Oh no! Something went wrong.\nCheck the console for details.');
//     console.log(error);
// });


//
// $('#deleteMovie').on('click', function (event) {
//     console.log("trying to delete");
//     deleteMovie(34).then(getMovies).then((movies) => {
//         console.log('Here are all the movies:');
//         movies.forEach(({title, rating}) => {
//             console.log(`${title} ${rating}`);
//         });
//     }).catch((error) => {
//         alert('Oh no! Something went wrong when deleting a movie.\nCheck the console for details.');
//         console.log(error);
//     });
//     location.reload();
// });


//ties delete movie function to icon on card
//  "this.id"?
// $(".deleteMovie").click(function (event) {
//     deleteMovie(33).then(getMovies).then((movies) => {
//         console.log('Here are all the movies:');
//         movies.forEach(({title, rating}) => {
//             console.log(`${title} ${rating}`);
//         });
//     }).catch((error) => {
//         alert('Oh no! Something went wrong when deleting a movie.\nCheck the console for details.');
//         console.log(error);
//     });
// });


// $("addCard").click()


//Ties save new movie into button on modal
$("#saveNew").click(function (event) {
    postMovie({
        "title": $("#addMovieTitle").val(),
        "genre": $("#addMovieGenre").val(),
        "rating": $("#addMovieRating").val(),
        "poster": `<img src='../moviePosters/${"#addFileInput"}.val()' class='moviePoster' alt=''></img>`
    }).then(getMovies).then((movies) => {
        console.log('Here are all the movies:');
        movies.forEach(({title, genre, rating, poster}) => {
            console.log(`${title} ${rating} ${poster}`);
        });
    }).catch((error) => {

    });
    getMovies().then((movies) => {
        $('#preloader').html("");
        $(".card-container").html("");
        $(".card-container").html(`<div id="addCard" data-toggle="modal" data-target="#exampleModal">
                                <div class="card"> 
                                    <i class="fas fa-plus"></i>
                                    <div class="card-body">
                                        <p class="card-text">Add Your Own</p>
                                    </div>
                                </div>
                            </div>`);
        console.log('Here are all the movies:');
        movies.forEach(({title, genre, rating, id, poster}) => {
            console.log(`id#${id} - ${title} - rating: ${rating} - poster ${poster}`);
            let newTitle = `${title}`;
            let newGenre = `${genre}`;
            let newRating = `${rating}`;
            let newID = `${id}`;
            let newPoster = `${poster}`;
            makeCard(newTitle, newGenre, newRating, newID, newPoster);
        });
    }).catch((error) => {

    });
});







