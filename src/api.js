module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
    console.log(response);
  }
};



//makes individual movie card
// function makeCard(){
//   card = "";
//   card += `<div class="card">`;
//   card += `<img src="..." class="card-img-top" alt="...">`;
//   card += `    <div class="card-body">`;
//   card += `<p class="card-text">movie info</p>`;
//   card += `</div> </div>`
//
// }



