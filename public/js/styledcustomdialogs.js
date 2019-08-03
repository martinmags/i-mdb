/**
 * Creates a custom dialog for all the button events
 */
import {outEl, Movie, access_token} from './styledmovie.js';

// NOTE: references DOM objecys of elements from the document
var addMovEl = document.querySelector('#addmov');
var movFormEl = document.querySelector('#movForm');
var diaEl = document.querySelector('#dilg');
var listEl = document.querySelector('#checklist');

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

/**
 * editMovie(e) 
 * - handles the event of edit being clicked
 * - gets the target of the event (which is the edit button)
 * - then it accesses the existing movie properties one by one and sets them as
 * as the default values in the edit movie dialog.
 * - This way if a user doesn't input anything for the edited fields in the dialog,
 * then it uses the existing values of the old movie. 
 * 
 * @param {event of clicking on edited button} e 
 */
function editMovie(e) {

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
  let movieNode = editNode.parentElement;
  console.log("movie node: ", movieNode);

  // Sets image url
  let image = editNode.previousElementSibling;
  let imgNod = image.children[0];
  let tcImg = imgNod.getAttribute("src");

  // Sets the text content of user rating
  let usrRate = image.previousElementSibling;
  let tcUsrRate = usrRate.textContent;

  // Sets the genre
  let genre = usrRate.previousElementSibling;
  let tcGenre = genre.textContent;

  // Sets the rating
  let rating = genre.previousElementSibling;
  let tcRate = rating.textContent;

  // Sets the year
  let year = rating.previousElementSibling;
  let tcYear = year.textContent;

  // Sets the title
  let mTitle = year.previousElementSibling;
  let tcTitl = mTitle.textContent;

  // Creates the HTML
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

  //strID is each movie containers id attribute with the actual movie id appended to the end
  //of it like so id=movieID${id}
  let strID = movieNode.id;
  //is the actual movieid that was appended to the end of each movie container's
  //we then use this id to refer to the same movie in the database
  let movieID = strID.substring(7);

  console.log("strID: ", strID);
  console.log("movieID: ", movieID);
  console.log("event: ", e);

  //event listener for submitting edit form
  subBtn.addEventListener("click", function () {
    let valTitle = document.querySelector('#title').value;
    let valYear = document.querySelector('#year').value;
    let valRating = document.querySelector('#rating').value;
    let valGenre = document.querySelector('#genre').value;
    let valUsrRate = document.querySelector('#userRating').value;
    let valImgURL = document.querySelector('#image').value;

    //gets formdata values
    var formData = new FormData(movFormEl);
    var payL = new URLSearchParams(formData).toString();

    console.log("form formData1: ", formData);
    console.log("payL str1: ", payL);


    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    //xhr request object
    let xhrUpdate = new XMLHttpRequest();
    let updateEP = `https://introweb.tech/api/movies/${movieID}/replace?access_token=${access_token}`;

    xhrUpdate.open('POST', updateEP, false);

    xhrUpdate.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhrUpdate.send(payL);

    //parse the movie data to be readable
    let updatedMovie = JSON.parse(xhrUpdate.responseText);

    console.log("addresponsetext: ",JSON.parse(xhrUpdate.responseText));

    //display the updated movie to the users
    displayEditedMovie(movieNode, updatedMovie);

  });

  diaEl.open = true;
}

/**
 * displayEditedMovie(divNode, updatedMovie)
 * - display edited movie
 * 
 * @param divNode - Movie entry container
 * @param updatedMovie - Movie entry from database
 */
function displayEditedMovie(divNode, updatedMovie) {
  divNode.children[0].innerHTML = updatedMovie.title;
  divNode.children[1].innerHTML = updatedMovie.year;
  divNode.children[2].innerHTML = updatedMovie.rating;
  divNode.children[3].innerHTML = updatedMovie.genre;
  divNode.children[4].innerHTML = updatedMovie.userRating;
  let imgNode = divNode.children[5].children[0];
  imgNode.setAttribute("src", `${updatedMovie.image}`);
}

/**
 * displayNewMovie(movie)
 * - display new movie
 * 
 * @param movie - movie entry from database
 */
function displayNewMovie(movie) {
  let divNode = document.createElement("div");
  divNode.setAttribute("id", `movieID${movie.id}`);

  // Create title node and append
  let ttlNode = document.createElement("p");
  ttlNode.setAttribute("class", "title");
  ttlNode.innerHTML = `${movie.title}`;
  divNode.appendChild(ttlNode);

  // Create year node and append
  let yrNode = document.createElement("p");
  yrNode.setAttribute("class", "year");
  yrNode.innerHTML = `${movie.year}`;
  divNode.appendChild(yrNode);

  // Create rating node and append
  let rtNode = document.createElement("p");
  rtNode.setAttribute("class", "rating");
  rtNode.innerHTML = `${movie.rating}`;
  divNode.appendChild(rtNode);

  // Create genre node and append
  let genreNode = document.createElement("p");
  genreNode.setAttribute("class", "genre");
  genreNode.innerHTML = `${movie.genre}`;
  divNode.appendChild(genreNode);

  // Create user rating node and append
  let usrRtNode = document.createElement("p");
  usrRtNode.setAttribute("class", "usrRating");
  usrRtNode.innerHTML = `${movie.userRating}`;
  divNode.appendChild(usrRtNode);

  // Create image node and append
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

/**
 * deleteMovie()
 * - Delete an existing movie
 */
function deleteMovie(e) {
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

  //delete movie works in the same way editMovie() works from here on out
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

    console.log(xhrDel.responseText);
    console.log(movjson);

  });

  diaEl.open = true;
}

/**
 * addMovDia()
 * - Dialog box for when "Add Movie" button is clicked.
 */
function addMovDia() {
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

  // Event listener for "Submit" btn
  subBtn.addEventListener("click", function () {
    //form data object convert into a query string
    var formData = new FormData(movFormEl);
    var payL = new URLSearchParams(formData).toString();

    console.log("form formData1: ", formData);
    console.log("payL str1: ", payL);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    //http reject for adding a movie
    let xhrAdd = new XMLHttpRequest();

    xhrAdd.open('POST', addEP, false);

    //setting header
    xhrAdd.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhrAdd.send(payL);

    let movie = JSON.parse(xhrAdd.responseText);

    console.log("addresponsetext: ",JSON.parse(xhrAdd.responseText));

    //display new movie to the user
    displayNewMovie(movie);


    console.log("form data: ", formData);
    console.log("reponseText of adding movie: ", xhrAdd.responseText);
    console.log("respTxt json: ", JSON.parse(xhrAdd.responseText));

    diaEl.open = false;
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

// Set the eventListeners for all existing buttons
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
