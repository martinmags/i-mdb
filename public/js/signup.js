import {baseAPI, handleResponse} from '/js/login.js';
//module wide variables
var signupForm = document.querySelector('#signup-form');
var submitBtn = document.querySelector('#signupSubmit');
var passAgain = document.querySelector('#newPassAgain');
var pass = document.querySelector('form#signup-form input#password');
var usernameUp = document.querySelector('form#signup-form input#username');
var responseLogin;

/**
 * loginAfter()
 * - this function handles the response of a user being logged in and retrieves the
 * id (access_token) which is used for sessionizing
 * 
 * @param {the xhr object for login request} xhr 
 */
function loginAfter(xhr) {
  if(xhr.readyState == 4 && xhr.status == 200) {
    responseLogin = JSON.parse(xhr.responseText).id;
    console.log("inside loginafter: ", xhr.responseText);
    localStorage.setItem('access_token', responseLogin);
    //LOGGED IN SUCCESSFULLY
    window.location.replace('index.html');

  }
}


/**
 * handleReponseUp
 * - handles reponse of sign up request, used in place of readystatechange
 * @param {event of a signup requst being loaded} e 
 */
function handleResponseUp(e) {
  let oResp = e.target;
  const usrEP = `https://introweb.tech/api/Users/login`;
  //if(oReq.readyState == 4 && oReq.status == 200) {
    console.log("type of: ", typeof e);
    console.log("logging event: ", e);
    console.log("status: ", oResp.status);
    console.log("readystate: ", oResp.readyState);
    console.log("logging e.target: ", oResp);
    console.log("logging JSON.parse(oReq): ", JSON.parse(oResp.responseText));
    console.log("loggin response text: no status:", oResp.responseText);
    if(oResp.status == 200) {
      console.log("loggin response text: status == 200:", JSON.parse(oResp.responseText).id);
      //console.log()
    }

    let httpResp = oResp.getResponseHeader("Content-Type");
    let prsdText = JSON.parse(oResp.responseText);
    let status = oResp.status;

    console.log("status: code", status);

    const access_token = prsdText.id;


    console.log("access_token: ", access_token);
    console.log("got access_token successfully\nredirecting to content (movielist) page");
    console.log("LOGIN SUCESSFULL");

    //once the user successfully signs up. we use their username and password parameters
    //to login for them which a nice QoL change and i see a lot of well known websites not implementing
    let xhrLogin = new XMLHttpRequest();
    xhrLogin.open('POST', usrEP, true);

    xhrLogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhrLogin.onreadystatechange = function () {loginAfter(xhrLogin)};
    console.log("reponselogin: ", responseLogin);

    let username = usernameUp.value;
    console.log("usernameUp: ", usernameUp);
    console.log("usernameUp.value == userame: ", usernameUp.value);
    let password = pass.value;
    console.log("pass: ", pass);
    console.log("pass.value == password: ", pass.value);

    xhrLogin.send(`username=${username}&password=${password}`);

    console.log("RESPTEXT FROM LOGIN: ", xhrLogin.responseText);
}


/**
 * submitRequest
 * - takes in the sign up form fields and sends a sign up request for the user
 * 
 * @param {event of a submit being clicked for signup} e 
 */
function submitRequest (e) {
  //this line handles the event in which the password and retyped password don't match
  if(!(pass.value === passAgain.value)) {
    return false;
  }

  //this is to prevent the submit button from refresing the page on click
  //which effectively loses all the data and http request doesnt go through
  e.preventDefault();

  let formData = new FormData(signupForm);
  let payload = new URLSearchParams(formData).toString();

  console.log("form data: ", formData);
  console.log("payload: ", payload);

  const endpoint = `https://introweb.tech/api/Users`;


  console.log("paylod for login: ", payload);

  let oReq = new XMLHttpRequest();
  oReq.open('POST', endpoint, true);

  oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  oReq.addEventListener("load", handleResponseUp);
  oReq.send(payload);
}

//onload we want to add a submit eventListener this is used in conjuction with the 
//first line subtmitRequest where the passwords dont match. it effectively loops until passwords match
window.onload = submitBtn.addEventListener("click", submitRequest);
