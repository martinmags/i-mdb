
import {outEl, Movie, access_token} from './styledmovie.js';

// NOTE: references DOM objecys of elements from the document
var addMovEl = document.querySelector('#addmov');
var movFormEl = document.querySelector('#movForm');
var diaEl = document.querySelector('#dilg');
var listEl = document.querySelector('#checklist');

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

// NOTE: function for editing movie data
function editMovie(e) {
  //disable();
  console.log("target: ", e.target);
  console.log("event: ", e);

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

  // Causing issues rn
  let image = editNode.previousElementSibling;
  let imgNod = image.children[0];
  let tcImg = imgNod.getAttribute("src");

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
    </label>
    <label> Year :
      <input type="text" id="year" value="${tcYear}" name="year">
    </label>
    <label> Rating:
      <select form="movForm" id="rating" name="rating" required>
        <option value="${tcRate}" selected hidden>${tcRate}</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="NR">NR</option>
      </select>
    </label>
    <label> Genre:
      <input type="text" id="genre" value="${tcGenre}" name="genre">
    </label>
    <label> User rating:
      <input type="number" id="userRating" value="${tcUsrRate}" name="userRating">
    </label>
    <label> Image URL:
      <input type="text" id="image" value="${tcImg}" name="image">
    </label>
    <div id="btns">
      <input type="submit" name="cnlBtn" id="cnlBtn" value="Cancel">
      <input type="submit" name="subBtn" id="subBtn" value="Save">
    </div>
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


    var formData = new FormData(movFormEl);
    var payL = new URLSearchParams(formData).toString();

    console.log("form formData1: ", formData);
    console.log("payL str1: ", payL);


    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    let xhrUpdate = new XMLHttpRequest();
    let updateEP = `https://introweb.tech/api/movies/${movieID}/replace?access_token=${access_token}`;

    xhrUpdate.open('POST', updateEP, false);

    xhrUpdate.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhrUpdate.send(payL);

    let updatedMovie = JSON.parse(xhrUpdate.responseText);

    console.log("addresponsetext: ",JSON.parse(xhrUpdate.responseText));

    displayEditedMovie(movieNode, updatedMovie);

  });

  diaEl.open = true;
}



// NOTE: function for display edited movie in page
function displayEditedMovie(divNode, updatedMovie) {

  divNode.children[0].innerHTML = updatedMovie.title;
  divNode.children[1].innerHTML = updatedMovie.year;
  divNode.children[2].innerHTML = updatedMovie.rating;
  divNode.children[3].innerHTML = updatedMovie.genre;
  divNode.children[4].innerHTML = updatedMovie.userRating;
  let imgNode = divNode.children[5].children[0];
  imgNode.setAttribute("src", `${updatedMovie.image}`);
}


// NOTE: function that handels the event when is clicked on
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
  // Fix star entity output
  usrRtNode.innerHTML = `${movie.userRating}`;
  divNode.appendChild(usrRtNode);

  let imgNode = document.createElement("p");
  imgNode.setAttribute("class", "image");
  let imageNode = document.createElement("img");
  imageNode.setAttribute("src", `${movie.image}`);
  imageNode.setAttribute("alt", `Not a valid image link`);
  imageNode.setAttribute("style", "width: inherit; height: inherit;");
  imgNode.appendChild(imageNode);
  //imgNode.innerHTML = `${movie.image}`;
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
  //disable();
  console.log("going to delete this movie: ", e);

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

    console.log("strID: ", strID);
    console.log("movieID: ", movieID);

    let xhrDel = new XMLHttpRequest();

    let ep = `https://introweb.tech/api/movies/${movieID}?access_token=${access_token}`;
    console.log('deleting following movie from db');
    xhrDel.open('DELETE', ep, false);
    xhrDel.send(null);
    let movjson = JSON.parse(xhrDel.responseText);

    //mlEl.innerHTML = xhrDel.responseText;

    console.log(xhrDel.responseText);
    console.log(movjson);

    // if(outputNode.children.length == 0) {
    //   outEl.appendChild(noMovies);
    // }
    //enable();
  });

  diaEl.open = true;

}

function addMovDia() {

  // NOTE: LOGGING IN EACH TIME??

  let addEP = `https://introweb.tech/api/movies?access_token=${access_token}`;

  console.log("access_token in addMovDialog: ", access_token);


  movFormEl.innerHTML =
  `
    <label> Title:
      <input type="text" id="title" name="title">
    </label>
    <label> Year :
      <input minlength="4" maxlength="4" type="number" id="year" name="year">
    </label>
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
    </label>
    <label> User rating:
      <input type="number" id="userRating" name="userRating">
    </label>
    <label> Image URL:
      <input type="text" id="image" name="image">
    </label>
    <div id="btns">
      <input type="submit" name="cnlBtn" id="cnlBtn" value="Cancel">
      <input type="submit" name="subBtn" id="subBtn" value="Save">
    </div>
  `;

  //disable();
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


    console.log("form data: ", formData);
    console.log("reponseText of adding movie: ", xhrAdd.responseText);
    console.log("respTxt json: ", JSON.parse(xhrAdd.responseText));

    diaEl.open = false;
    //enable();
  });


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


addMovEl.addEventListener("click", addMovDia);

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
