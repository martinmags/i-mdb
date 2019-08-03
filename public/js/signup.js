import {baseAPI, handleResponse} from '/js/login.js';

var signupForm = document.querySelector('#signup-form');
var submitBtn = document.querySelector('#signupSubmit');
var passAgain = document.querySelector('#newPassAgain');
var pass = document.querySelector('form#signup-form input#password');
var usernameUp = document.querySelector('form#signup-form input#username');
var responseLogin;

function loginAfter(xhr) {
  if(xhr.readyState == 4 && xhr.status == 200) {
    responseLogin = JSON.parse(xhr.responseText).id;
    console.log("inside loginafter: ", xhr.responseText);
    localStorage.setItem('access_token', responseLogin);
    //LOGGED IN SUCCESSFULLY
    window.location.replace('index.html');

  }
}



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
    //console.log("respont text: ", JSON.parse(respText));

    const access_token = prsdText.id;

    //localStorage.setItem('access_token', access_token);

    console.log("access_token: ", access_token);
    console.log("got access_token successfully\nredirecting to content (movielist) page");
    //window.location.replace('index.html');
    console.log("LOGIN SUCESSFULL");

    let xhrLogin = new XMLHttpRequest();
    xhrLogin.open('POST', usrEP, true);

    xhrLogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    //xhrLogin.addEventListener("load", handleResponse);
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
    //e.preventDefault();

    //console.log("responseJSON from signup: ", oReq.responseText);

    //console.log(JSON.parse(httpResp));

    //console.log("all response headers: ", typeof httpResp);
  //}
}









function submitRequest (e) {
  if(!(pass.value === passAgain.value)) {
    return false;
  }

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


window.onload = submitBtn.addEventListener("click", submitRequest);
