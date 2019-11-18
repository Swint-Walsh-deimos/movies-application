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

//does not work
// const {movies} = require('./db.json');
// console.log(movies.id);


//---------------------generate cards----------------------

let ID;


function makeCard(title, rating, id) {

    let card;
    card = "";
    card += `<div class="card">`;
    card += `<div class="card-body">`;
    card += `<p class="card-text">${title}, ${rating}</p>`;
    card += `<div id="">`;
    card += `<button> <i class="fas fa-edit editMovie" id="${id}" data-toggle="modal" data-target="#exampleModal2"></i></button>`;
    card += `<button class="deleteMovie" id="${id}"> <i class="fas fa-trash-alt" id="${id}"></i></button>`;
    card += `</div>`;
    card += `</div></div>`;
    document.getElementById("card-container").innerHTML += card;

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
                    movies.forEach(({title, rating, id}) => {
                        console.log(`id#${id} - ${title} - rating: ${rating}`);
                        let newTitle = `${title}`;
                        let newRating = `${rating}`;
                        let newID = `${id}`;
                        makeCard(newTitle, newRating, newID);
                    });
                }).catch((error) => {
                    alert('Oh no! Something went wrong when getting movies.\nCheck the console for details.');
                    console.log(error);
                });
            }).catch((error) => {
                alert('Oh no! Something went wrong when deleting a movie.\nCheck the console for details.');
                console.log(error);
            });

            // location.reload();
        } else alert("something went wrong!")
    });


    //edit movie is name of class for modal,
    $('.editMovie').on('click', function (event) {
        ID = $(this).attr("id");
        // hgave id be a global addParsedVariableToModule(change the value of id, based upon what edit button is clickiewd)


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
                alert('Oh no! Something went wrong.\nCheck the console for details.');
                console.log(error);
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
                movies.forEach(({title, rating, id}) => {
                    console.log(`id#${id} - ${title} - rating: ${rating}`);
                    let newTitle = `${title}`;
                    let newRating = `${rating}`;
                    let newID = `${id}`;
                    makeCard(newTitle, newRating, newID);

                });
            }).catch((error) => {
                alert('Oh no! Something went wrong when getting movies.\nCheck the console for details.');
                console.log(error);
            });
        });

    });

}




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
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
        let newTitle = `${title}`;
        let newRating = `${rating}`;
        let newID = `${id}`;
        makeCard(newTitle, newRating, newID);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong when getting movies.\nCheck the console for details.');
    console.log(error);
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
        "rating": $("#addMovieRating").val()
    }).then(getMovies).then((movies) => {
        console.log('Here are all the movies:');
        movies.forEach(({title, rating}) => {
            console.log(`${title} ${rating}`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong when adding a movie.\nCheck the console for details.');
        console.log(error);
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
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            let newTitle = `${title}`;
            let newRating = `${rating}`;
            let newID = `${id}`;
            makeCard(newTitle, newRating, newID);

        });
    }).catch((error) => {
        alert('Oh no! Something went wrong when getting movies.\nCheck the console for details.');
        console.log(error);
    });
});



