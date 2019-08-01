
import {outEl, noMovies, Movie, access_token} from './styledmovie.js'

// NOTE: references DOM objecys of elements from the document
var addMovEl = document.querySelector('#addmov');
var movFormEl = document.querySelector('#movForm');
var diaEl = document.querySelector('#dilg');
var listEl = document.querySelector('#checklist');

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
//
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
// let addEP = `http://introweb.tech/api/movies?${access_token}`;
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




// NOTE: function for editing movie data
function editMovie(e) {
  disable();
  console.log("target: ", e.target);

  let eventNode = e.target;
  let editNode;
  if(eventNode.tagName == "IMG") {
    editNode = eventNode.parentElement;
  }
  else {
    editNode = eventNode;
  }

  console.log("new target: ", editNode);



  //let editNode = e.target;
  let movieNode = editNode.parentElement;

    console.log("movie node: ", movieNode);

  let image = editNode.previousElementSibling;
  let tcImg = image.textContent;

  let usrRate = image.previousElementSibling;
  let tcUsrRate = usrRate.textContent;

  let genre = usrRate.previousElementSibling;
  let tcGenre = genre.textContent;

  let rating = genre.previousElementSibling;
  let tcRate = rating.textContent;

  let year = rating.previousElementSibling;
  let tcYear = year.textContent;

  let mTitle = year.previousElementSibling;
  let tcTitl = mTitle.textContent;




  movFormEl.innerHTML =
  `
    <label> Title:
      <input type="text" id="title" value="${tcTitl}" name="title">
    </label><br>
    <label> Year :
      <input type="text" id="year" value="${tcYear}" name="year">
    </label><br>
    <label> Rating:
      <select form="movForm" id="rating" name="rating" required>
        <option value="${tcRate}" selected hidden>${tcRate}</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="NR">NR</option>
      </select>
    </label><br>
    <label> Genre:
      <input type="text" id="genre" value="${tcGenre}" name="genre">
    </label>
    <label> User rating:
      <input type="number" id="userRating" value="${tcUsrRate}" name="userRating">
    </label>
    <label> Image URL:
      <input type="text" id="image" value="${tcImg}" name="image">
    </label>
    <input type="submit" name="cnlBtn" id="cnlBtn" value="Cancel">
    <input type="submit" name="subBtn" id="subBtn" value="Save">
  `;

  let strID = movieNode.id;
  let movieID = strID.substring(7);

  console.log("strID: ", strID);
  console.log("movieID: ", movieID);

  console.log("event: ", e);

  subBtn.addEventListener("click", function () {
    let valTitle = document.querySelector('#title').value;
    let valYear = document.querySelector('#year').value;
    let valRating = document.querySelector('#rating').value;
    let valGenre = document.querySelector('#genre').value;
    let valUsrRate = document.querySelector('#userRating').value;
    let valImgURL = document.querySelector('#image').value;

    // if(valRating) {
    //   console.log("new rated: ", valRating);
    // }
    // else {
    //   console.log("new rating not entered, assuming old value of: ", tcRate);
    //   valRating = tcRate;
    // }

    var formData = new FormData(movFormEl);
    var payL = new URLSearchParams(formData).toString();

    console.log("form formData1: ", formData);
    console.log("payL str1: ", payL);


    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    let xhrUpdate = new XMLHttpRequest();
    let updateEP = `http://introweb.tech/api/movies/${movieID}/replace?access_token=${access_token}`;

    xhrUpdate.open('POST', updateEP, false);

    xhrUpdate.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhrUpdate.send(payL);

    let updatedMovie = JSON.parse(xhrUpdate.responseText);

    console.log("addresponsetext: ",JSON.parse(xhrUpdate.responseText));

    displayEditedMovie(movieNode, updatedMovie);
    enable();
  });

  cnlBtn.addEventListener("click", ()=>{ enable(); });




  diaEl.open = true;
}

// NOTE: function for display edited movie in page
function displayEditedMovie(divNode, updatedMovie) {

  divNode.children[0].innerHTML = updatedMovie.title;
  divNode.children[1].innerHTML = updatedMovie.year;
  divNode.children[2].innerHTML = updatedMovie.rating;
  divNode.children[3].innerHTML = updatedMovie.genre;
  divNode.children[4].innerHTML = updatedMovie.userRating;
  divNode.children[5].innerHTML = updatedMovie.image;

  outList


  //let movieNode = document.querySelector(`${strID}`);
  // console.log(divNode);
  // for(let i = 0; i < 6; i++) {
  //   console.log(divNode.children[i].innerHTML);
  //   divNode.children[i].innerHTML = movies[movieIndex][j];
  //   console.log(movies[movieIndex][j]);
  // }
}


// NOTE: function that handels the event when edited is clicked on
function displayNewMovie(movie) {

  let divNode = document.createElement("div");
  divNode.setAttribute("id", `movieID${movie.id}`);


  //create title node and append
  let ttlNode = document.createElement("p");
  ttlNode.setAttribute("class", "title");
  ttlNode.innerHTML = `${movie.title}`;
  divNode.appendChild(ttlNode);


  //create year node and append
  let yrNode = document.createElement("p");
  yrNode.setAttribute("class", "year");
  yrNode.innerHTML = `${movie.year}`;
  divNode.appendChild(yrNode);

  //create rating node and append
  let rtNode = document.createElement("p");
  rtNode.setAttribute("class", "rating");
  rtNode.innerHTML = `${movie.rating}`;
  divNode.appendChild(rtNode);

  let genreNode = document.createElement("p");
  genreNode.setAttribute("class", "genre");
  genreNode.innerHTML = `${movie.genre}`;
  divNode.appendChild(genreNode);

  let usrRtNode = document.createElement("p");
  usrRtNode.setAttribute("class", "usrRating");
  usrRtNode.innerHTML = `${movie.userRating}`;
  divNode.appendChild(usrRtNode);

  let imgNode = document.createElement("p");
  imgNode.setAttribute("class", "image");
  imgNode.innerHTML = `${movie.image}`;
  divNode.appendChild(imgNode);

  //create edit node and append
  let ediNode = document.createElement("p");
  ediNode.setAttribute("class", "edit");
  ediNode.innerHTML = `<img src="/media/pen1.png" alt="pen icon"> Edit`;
  divNode.appendChild(ediNode);

  //create delete node and append
  let delNode = document.createElement("p");
  delNode.setAttribute("class", "dlt");
  delNode.innerHTML = `<img src="/media/trash1.jpg" alt="trash icon"> Delete`;
  divNode.appendChild(delNode);

  outEl.appendChild(divNode);


  setTimeout(() => {
                  var editBtnsList = document.getElementsByClassName('edit');
                  var dletBtnsList = document.getElementsByClassName('dlt');

                  for (let i = 0; i < editBtnsList.length; i++) {
                    editBtnsList.item(i).addEventListener("click", editMovie);
                    dletBtnsList.item(i).addEventListener("click", deleteMovie);
                  }
          }, 0);
}




// NOTE: function that handels the even when deleted is clicked on
function deleteMovie(e) {
  disable();
  console.log("going to delete this movie: ", e);
  // console.log("movie 2 id: ", movie2id);


  //event.target gives you the html tag/object the event triggered on/from
  console.log("target: ", e.target);

  let eventNode =  e.target;
  let deltNode;
  if(eventNode.tagName == "IMG") {
    console.log('clicked on img tag');
    deltNode =  eventNode.parentElement;
  }
  else {
    deltNode = eventNode;
  }


  console.log("new target: ", deltNode);


  let movieNode = deltNode.parentElement;

  console.log("movie node: ", movieNode);



  let outputNode = movieNode.parentElement;

  movFormEl.innerHTML =
  `
    <label id="delQ"> <p>Delete movie?</p>
      <input type="submit" name="cnlBtn" id="cnlBtn" value="Cancel">
      <input type="submit" name="subBtn" id="subBtn" value="Ok">
    </label>
  `;

  let strID = movieNode.id;
  let movieID = strID.substring(7);

  console.log("strID: ", strID);
  console.log("movieID: ", movieID);

  subBtn.addEventListener("click", function () {
    movieNode.remove();
    // delete movies[movieIndex];
    // localStorage.setItem('styArray', JSON.stringify(movies));
    // console.log("movies in output: ", outputNode.children.length);

    console.log("strID: ", strID);
    console.log("movieID: ", movieID);

    let xhrDel = new XMLHttpRequest();

    let ep = `http://introweb.tech/api/movies/${movieID}?access_token=${access_token}`;
    console.log('deleting following movie from db');
    xhrDel.open('DELETE', ep, false);
    xhrDel.send(null);
    let movjson = JSON.parse(xhrDel.responseText);

    //mlEl.innerHTML = xhrDel.responseText;

    console.log(xhrDel.responseText);
    console.log(movjson);

    if(outputNode.children.length == 0) {
      outEl.appendChild(noMovies);
    }
    enable();
  });
  cnlBtn.addEventListener("click", ()=>{ enable(); });

  diaEl.open = true;

}

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
//
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

// NOTE: function that shows dialog promopt when add new movie is clicked on
function addMovDia() {

  // NOTE: LOGGING IN EACH TIME??

  let addEP = `http://introweb.tech/api/movies?access_token=${access_token}`;

  console.log("access_token in addMovDialog: ", access_token);

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

  movFormEl.innerHTML =
  `
    <label> Title:
      <input type="text" id="title" name="title">
    </label><br>
    <label> Year :
      <input type="number" id="year" name="year">
    </label><br>
    <label> Genre:
      <input type="text" id="genre" name="genre">
    </label>
    <label> Rating:
      <select id="rating" value="" name="rating">
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="NR">NR</option>
      </select>
    </label><br>
    <label> User rating:
      <input type="number" id="userRating" name="userRating">
    </label>
    <label> Image URL:
      <input type="text" id="image" name="image">
    </label>

    <input type="submit" name="cnlBtn" id="cnlBtn" value="Cancel">
    <input type="submit" name="subBtn" id="subBtn" value="Save">
  `;

  disable();
  subBtn.addEventListener("click", function () {
    var formData = new FormData(movFormEl);
    var payL = new URLSearchParams(formData).toString();

    console.log("form formData1: ", formData);
    console.log("payL str1: ", payL);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    let xhrAdd = new XMLHttpRequest();

    xhrAdd.open('POST', addEP, false);

    xhrAdd.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhrAdd.send(payL);

    let movie = JSON.parse(xhrAdd.responseText);

    console.log("addresponsetext: ",JSON.parse(xhrAdd.responseText));

    displayNewMovie(movie);


    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4 && xhr.status == 200) {
    //     console.log(xhr.responseText);
    //   }
    // };

    //xhrAdd.send(`title=${valTitle}&year=${valYear}&genre=${valGenre}&rating=${valRating}&userRating=${valUsrRate}&image=${valImgURL}`);

    console.log("form data: ", formData);
    console.log("reponseText of adding movie: ", xhrAdd.responseText);
    console.log("respTxt json: ", JSON.parse(xhrAdd.responseText));

    diaEl.open = false;
    enable();
  });

  cnlBtn.addEventListener("click", () => {enable();});


  // var formData1 = new FormData(movFormEl);
  // var payL1 = new URLSearchParams(formData1).toString();
  //
  // console.log("form formData1: ", formData1);
  // console.log("payL str1: ", payL1);

  diaEl.open = true;

  setTimeout(() => {
    var editBtnsList = document.getElementsByClassName('edit');
    var dletBtnsList = document.getElementsByClassName('dlt');

    // console.log(editBtnsList.item(0));
    for (let i = 0; i < editBtnsList.length; i++) {
      editBtnsList.item(i).addEventListener("click", editMovie);
      dletBtnsList.item(i).addEventListener("click", deleteMovie);
    }}, 0
  );

}

/**
 * disable()
 * - Disables buttons and lowers opacity of background
 */
function disable(){
  const page = document.getElementById("page");
  let editBtnsList = document.getElementsByClassName('edit');
  let dletBtnsList = document.getElementsByClassName('dlt');

  // console.log(editBtnsList.item(0));
  for (let i = 0; i < editBtnsList.length; i++) {
    editBtnsList.item(i).style = "display: none";
    dletBtnsList.item(i).style = "display: none";
  }
  page.style = "opacity: 0.1";
}
/**
 * enable()
 * - Enables buttons and brings back opacity
 */
function enable(){
  const page = document.getElementById("page");
  setTimeout(() => {
    var editBtnsList = document.getElementsByClassName('edit');
    var dletBtnsList = document.getElementsByClassName('dlt');

    // console.log(editBtnsList.item(0));
    for (let i = 0; i < editBtnsList.length; i++) {
      editBtnsList.item(i).style = "display: block";
      dletBtnsList.item(i).style = "display: block";
    }}, 0
  );
  page.style = "opacity: 1";
}

var mlEl = document.querySelector('#movieList');

var movie2id;

function outList(e) {
  let xhrGet = new XMLHttpRequest();
  let ep = `http://introweb.tech/api/movies/movieList?access_token=${access_token}`;
  console.log('writing db movie list');
  xhrGet.open('GET', ep, false);
  xhrGet.send(null);
  let movjson = JSON.parse(xhrGet.responseText);

  mlEl.innerHTML = xhrGet.responseText;

  console.log(xhrGet.responseText);
  console.log(movjson);
  console.log(movjson.movies);
  console.log(movjson.movies[1]);
  console.log(movjson.movies[1].id);
  movie2id = movjson.movies[1].id;
  console.log("movie2 id: ", movie2id);
}


// listEl.addEventListener('click', outList);

// NOTE: adding event listeners for each edit and delete buttons of a movie
//this is repeated throughout the module
addMovEl.addEventListener("click", addMovDia);

setTimeout(() => {
  var editBtnsList = document.getElementsByClassName('edit');
  var dletBtnsList = document.getElementsByClassName('dlt');

  // console.log(editBtnsList.item(0));
  for (let i = 0; i < editBtnsList.length; i++) {
    editBtnsList.item(i).addEventListener("click", editMovie);
    dletBtnsList.item(i).addEventListener("click", deleteMovie);
  }}, 0
);
