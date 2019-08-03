
// NOTE: movies arary holds data and is stored in localStorage
// var movies = localStorage.getItem('styArray') ? JSON.parse(localStorage.getItem('styArray')) : new Array();
// localStorage.setItem('styArray', JSON.stringify(movies));
const access_token = localStorage.getItem('access_token');
let logoutBtn = document.querySelector("#content > #logout");
const baseURL = "https://introweb.tech/api";

// NOTE: references DOM objecys of elements from the document
var outEl = document.querySelector('#result');
//var noMovies = document.createTextNode("No movies currently listed ");

// NOTE: movie object function
function Movie(title, year, rating, genre, usrRating, imageURL, movID) {
  this.title = title;
  this.year = year;
  this.rating = rating;
  this.genre = genre;
  this.userRating = usrRating;
  this.image = imageURL;
  this.movID = movID;
  this.edit;
  this.delMovie;
}

function relogin() {

  window.location.replace('login-signup.html');
  // const usrEP = `http://introweb.tech/api/Users/login`;
  //
  // let usrPL = 'username=tempuse1&password=temppass1';
  //
  // let oReq = new XMLHttpRequest();
  //
  //
  //
  // oReq.open('POST', usrEP, true);
  //
  // //oReq.setRequestHeader('Set-cookie', `${oReq.responseText}`);
  // oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  //
  // oReq.onload = function() {
  //   console.log("access_token in relogin: ", JSON.parse(oReq.responseText)['id']);
  //   access_token = JSON.parse(oReq.responseText)['id'];
  //   document.cookie = `${access_token}`;
  //   console.log("new access_token (after setting in-- relogin) is: ", access_token);
  // }
  //
  //
  //
  // oReq.send(usrPL);
  //
  //
  // //console.log("access_token to: ", JSON.parse(accToken)['id']);
  //
  //
  //
  // console.log("new access_token (eof relogin) is: ", access_token);

}

// NOTE: function for displaying movies on page onload
function defaultMovies() {


  if(!access_token) {
    console.log("no access_token, setting it now");
    relogin();
    console.log("new access_token is: ", access_token);

  }
  else {
    console.log("access_token value is (in defaultMovies firstline): ", access_token);
  }

  console.log("value of access_token in defaultMovies: ", access_token);


  let xhrGet = new XMLHttpRequest();
  let ep = `https://introweb.tech/api/movies/movieList?access_token=${access_token}`;
  console.log('writing db movie list');
  xhrGet.open('GET', ep, false);

  let movjson;
  xhrGet.onload = function() {
    if(xhrGet.status == 200) {
      movjson = JSON.parse(xhrGet.responseText);
    }
  }



  xhrGet.send(null);


 //USERNAME: akjshdlaj
  console.log(xhrGet.responseText);
  console.log(movjson);
  //ERROR HERE: on startup
  //Uncaught TypeError: Cannot read property 'movies' of undefined
  //  at defaultMovies (VM657 styledmovie.js:119)
  console.log(movjson.movies);


  let movies = movjson.movies;

  for (let i = 0; i < movies.length; i++) {

    if(movies[i] == null) {
      continue;
    }

    let divNode = document.createElement("div");
    divNode.setAttribute("id", `movieID${movies[i].id}`);


    //create title node and append
    let ttlNode = document.createElement("p");

    ttlNode.setAttribute("class", "title");
    ttlNode.innerHTML = `${movies[i].title}`;
    divNode.appendChild(ttlNode);

    //create year node and append
    let yrNode = document.createElement("p");
    yrNode.setAttribute("class", "year");
    yrNode.innerHTML = `${movies[i].year}`;
    divNode.appendChild(yrNode);

    //create rating node and append
    let rtNode = document.createElement("p");
    rtNode.setAttribute("class", "rating");
    rtNode.innerHTML = `${movies[i].rating}`;
    divNode.appendChild(rtNode);

    let genreNode = document.createElement("p");
    genreNode.setAttribute("class", "genre");
    genreNode.innerHTML = `${movies[i].genre}`;
    divNode.appendChild(genreNode);


    let usrRtNode = document.createElement("p");
    usrRtNode.setAttribute("class", "usrRating");
    usrRtNode.innerHTML = `${movies[i].userRating}`;
    divNode.appendChild(usrRtNode);

    let imgNode = document.createElement("p");
    imgNode.setAttribute("class", "image");
    let imageNode = document.createElement("img");
    imageNode.setAttribute("src", `${movies[i].image}`);
    imageNode.setAttribute("alt", `Not a valid image link`);
    imageNode.setAttribute("style", "width: inherit; height: inherit;");
    imgNode.appendChild(imageNode);
    //imgNode.innerHTML = `${movie.image}`;
    //imgNode.innerHTML = `${movies[i].image}`;
    divNode.appendChild(imgNode);

    //create edit node and append
    let ediNode = document.createElement("p");
    ediNode.setAttribute("class", "edit");
    ediNode.innerHTML = `<img src="media/pen1.png" alt="pen icon"> Edit`;
    divNode.appendChild(ediNode);

    //create delete node and append
    let delNode = document.createElement("p");
    delNode.setAttribute("class", "dlt");
    delNode.innerHTML = `<img src="media/trash1.jpg" alt="trash icon"> Delete`;
    divNode.appendChild(delNode);

    outEl.appendChild(divNode);
    // if(outEl.children.length == 0 && outEl.childNodes.length == 0) {
    //   outEl.appendChild(noMovies);
    // }

    // if(outEl.firstChild == noMovies && outEl.lastChild != noMovies)
    // {
    //   outEl.removeChild(noMovies);
    // }
  }
}


logoutBtn.addEventListener("click", () => {
  const endpoint = `${baseURL}/Users/logout?access_token=${access_token}`;
  let xhrLeave = new XMLHttpRequest();
  xhrLeave.open("POST", endpoint, true);
  xhrLeave.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  xhrLeave.send(null);
  console.log("LOGGED OUT: redirecting TO LOGIN PAGE");
  localStorage.removeItem('access_token');
  window.location.replace('login-signup.html');
})



// NOTE: display movies from localStorage on load
window.onload = defaultMovies;


//exports
export {outEl, Movie, access_token}
