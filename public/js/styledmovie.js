
// NOTE: movies arary holds data and is stored in localStorage
// var movies = localStorage.getItem('styArray') ? JSON.parse(localStorage.getItem('styArray')) : new Array();
// localStorage.setItem('styArray', JSON.stringify(movies));
const access_token = localStorage.getItem('access_token');
let logoutBtn = document.querySelector("#content > #logout");
const baseURL = "http://introweb.tech/api";

// NOTE: references DOM objecys of elements from the document
var outEl = document.querySelector('#result');
var noMovies = document.createTextNode("No movies currently listed ");

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

// NOTE: preloaded movies will only call once then comment it out
function preloadMovies() {
  movies[0] = new Movie("Star Wars", 1977, "PG", 0);
  movies[1] = new Movie("The Empire Strikes Back", 1980, "PG", 1);
  movies[2] = new Movie("The Revenge of the Jedi", 1983, "PG", 2);
  localStorage.setItem('styArray', JSON.stringify(movies));
}

// NOTE: function for displaying movies on page onload
function defaultMovies() {
  //UNCOMMENT THE LINE BELOW THE FIRST TIME ITS RUN TO SHOW THE PRELOADED MOVIES
  //preloadMovies();

  if(!access_token) {
    console.log("no access_token, setting it now");
    relogin();
    console.log("new access_token is: ", access_token);

  }
  else {
    console.log("access_token value is (in defaultMovies firstline): ", access_token);
  }

  console.log("value of access_token in defaultMovies: ", access_token);

  if(outEl.children.length == 0) {

    outEl.appendChild(noMovies);
  }

  let xhrGet = new XMLHttpRequest();
  let ep = `http://introweb.tech/api/movies/movieList?access_token=${access_token}`;
  console.log('writing db movie list');
  xhrGet.open('GET', ep, false);

  let movjson;
  xhrGet.onload = function() {
    if(xhrGet.status == 200) {
      movjson = JSON.parse(xhrGet.responseText);
    }
    // console.log("access_token in relogin: ", JSON.parse(oReq.responseText)['id']);
    // access_token = JSON.parse(oReq.responseText)['id'];
    // document.cookie = `${access_token}`;
    // console.log("new access_token (after setting in-- relogin) is: ", access_token);
  }



  xhrGet.send(null);




  //let movjson = JSON.parse(xhrGet.responseText);

  //mlEl.innerHTML = xhrGet.responseText;

  console.log(xhrGet.responseText);
  console.log(movjson);
  //ERROR HERE: on startup
  //Uncaught TypeError: Cannot read property 'movies' of undefined
  //  at defaultMovies (VM657 styledmovie.js:119)
  console.log(movjson.movies);

  //movie2id = movjson.movies[1].id;
  //console.log("movie2 id: ", movie2id);

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
    imgNode.innerHTML = `${movies[i].image}`;
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
    if(outEl.children.length == 0 && outEl.childNodes.length == 0) {
      outEl.appendChild(noMovies);
    }

    if(outEl.firstChild == noMovies && outEl.lastChild != noMovies)
    {
      outEl.removeChild(noMovies);
    }
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

// NOTE: MADE AN ACCOUNT WITH USERNAME: tempuse1 PASSWORD: temppass1 EMAIL: tempus1@gmail.com
// get the access_token yourself manually for testing
// {
//   const access_token = 'pl8jtebpLnDSAi9KA';
//   const endpoint = `http://introweb.tech/api/movies?access_token=${access_token}`;
//
//   const usrEP = `http://introweb.tech/api/Users`;
//
//   let usrPL = 'username=tempuse1&email=tempuse1@gmail.com&password=temppass1';
//
//   // hard code the payload at first
//   let payload = 'title=Hard+Coded+Again&year=2019&genre=Documentary&rating=G&userRating=5';
//
//   /* once you get that to work later you can read the data in and make a payload - since I had done my form nicely and matched the names to the API I could do something like this.
//
//   let formData = new FormData(document.querySelector('#addForm'));
//   let payload = new URLSearchParams(formData).toString();
//
//   You might build the query string yourself.  Many ways to do it, but console.log that step by itself to make sure it works before you send it
//
//   */
//
//   // make the XHR
//   let xhr = new XMLHttpRequest();
//   // first try as synchronous then change to async with a callback
//   xhr.open('POST', usrEP, true);
//   // make sure you set the right headers
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
//   // sent it on it's way
//   xhr.send(usrPL);
//   // you could alert here and then use Paw or Postman to see if it made it
//
//
//
//   // Word of advice, you could use Paw/Postman to add data manually at do the GET first, otherwise do the Add, then the Get then the Delete and then the update
// }

// const usrEP = `http://introweb.tech/api/Users/login`;
//
// let usrPL = 'username=tempuse1&password=temppass1';
//
// let xhr = new XMLHttpRequest();
//
// xhr.open('POST', usrEP, false);
//
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
//
// // xhr.onreadystatechange = function () {
// //   if (xhr.readyState == 4 && xhr.status == 200) {
// //     console.log(xhr.responseText);
// //   }
// // };
//
// xhr.send(usrPL);
//
// let httpResp = xhr.getResponseHeader("Content-Type");
// let respText = xhr.responseText;
// let status = xhr.status;
//
// console.log("status: code", status);
// console.log("respont text: ", JSON.parse(respText));
//
// const access_token = JSON.parse(respText)['id'];
//
// console.log("access_token: ", access_token);
//
// console.log(httpResp);
//
// console.log("all response headers: ", typeof httpResp);
//
// if(httpResp) {
//   console.log("all response headers: ", httpResp);
// }
// else {
//   console.log('http reponse string == empty');
// }










//exports
export {outEl, noMovies, Movie, access_token}
