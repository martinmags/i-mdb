
//get the access token from local storage and set it
const access_token = localStorage.getItem('access_token');
let logoutBtn = document.querySelector("#content > #logout");
const baseURL = "https://introweb.tech/api";

// NOTE: references DOM objecys of elements from the document
var outEl = document.querySelector('#result');

//Create eventListeners for any edit and delete buttons. Encapsulated in a setTimeout
setTimeout(() => {
  let editBtnsList = document.getElementsByClassName('edit');
  let dletBtnsList = document.getElementsByClassName('dlt');
  console.log("INBODY edit list", editBtnsList.length);
  console.log("INBODY LENGTH item(0)", editBtnsList.item(0));

  // console.log(editBtnsList.item(0));
  for (let i = 0; i < editBtnsList.length; i++) {
    console.log("INBODY CONSOLELOG");
    editBtnsList.item(i).addEventListener("click", editMovie);
    console.log("INBODY adding event listener for EDITS");
    dletBtnsList.item(i).addEventListener("click", deleteMovie);
    console.log("INBODY adding event listener for DELETES");
  }
});

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

/**
 * relogin()
 * - function redirections to the login/signup page
 */
function relogin() {
  window.location.replace('login-signup.html');
}

/**
 * defaultMovies()
 * - displays all the movies a user has on startup
 * - also if the users access_token is not saved in localStorage it redirects
 * to the signup/login page. this is an example of sessionizing
 */
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

  console.log(xhrGet.responseText);
  console.log(movjson);
  console.log(movjson.movies);


  let movies = movjson.movies;

  //array loops through users movies and displays them on the page
  for (let i = 0; i < movies.length; i++) {

    if(movies[i] == null) {
      continue;
    }

    let divNode = document.createElement("div");
    //append a movies id property to end of each movie containers id attribute
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

    //genre node
    let genreNode = document.createElement("p");
    genreNode.setAttribute("class", "genre");
    genreNode.innerHTML = `${movies[i].genre}`;
    divNode.appendChild(genreNode);

    //user rating node
    let usrRtNode = document.createElement("p");
    usrRtNode.setAttribute("class", "usrRating");
    usrRtNode.innerHTML = `${movies[i].userRating}`;
    divNode.appendChild(usrRtNode);

    //image node
    let imgNode = document.createElement("p");
    imgNode.setAttribute("class", "image");
    let imageNode = document.createElement("img");
    imageNode.setAttribute("src", `${movies[i].image}`);
    imageNode.setAttribute("alt", `Not a valid image link`);
    imageNode.setAttribute("style", "width: inherit; height: inherit;");
    imgNode.appendChild(imageNode);
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

    //appends movie to output element
    outEl.appendChild(divNode);
  }
}

//eventlistener for logout
logoutBtn.addEventListener("click", () => {
  const endpoint = `${baseURL}/Users/logout?access_token=${access_token}`;
  let xhrLeave = new XMLHttpRequest();
  xhrLeave.open("POST", endpoint, true);
  xhrLeave.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  xhrLeave.send(null);
  console.log("LOGGED OUT: redirecting TO LOGIN PAGE");
  localStorage.removeItem('access_token');
  window.location.replace('login-signup.html');
});


// NOTE: display movies from localStorage on load
window.onload = defaultMovies;

//Create eventListeners for any edit and delete buttons. Encapsulated in a setTimeout
setTimeout(() => {
  let editBtnsList = document.getElementsByClassName('edit');
  let dletBtnsList = document.getElementsByClassName('dlt');
  console.log("INBODY edit list", editBtnsList.length);
  console.log("INBODY LENGTH item(0)", editBtnsList.item(0));


  // console.log(editBtnsList.item(0));
  for (let i = 0; i < editBtnsList.length; i++) {
    console.log("INBODY CONSOLELOG");
    editBtnsList.item(i).addEventListener("click", editMovie);
    console.log("INBODY adding event listener for EDITS");
    dletBtnsList.item(i).addEventListener("click", deleteMovie);
    console.log("INBODY adding event listener for DELETES");
  }
});

//exports
export {outEl, Movie, access_token}
