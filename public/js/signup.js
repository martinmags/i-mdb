import {baseAPI} from '/js/login.js';

var signupForm = document.querySelector('#signup-form');
var submitBtn = document.querySelector('#signupSubmit');
var passAgain = document.querySelector('#newPassAgain');
var pass = document.querySelector('#newPassword');
var loginContainer = document.querySelector('#login-container');
var signupContainer = document.querySelector('#signup-container');

function submitRequest (e) {
  if(!(pass.value === passAgain.value)) {
    return false;
  }
  else {
    console.log("match continue");
  }

  let formData = new FormData(signupForm);
  let payload = new URLSearchParams(formData).toString();
  // let passMatch = (passAgain.value == pass.value);
  // if(passMatch) {
  //   console.log("passwords match. good to go!");
  // }
  // else {
  //   //console.log("passwords DO NOT MATCH! please retype");
  //   while(!passMatch) {
  //     else {
  //     console.log("passwords DO NOT MATCH! please retype");
  //     submitBtn.addEventListener("click", submitRequest);
  //     // formData = new FormData(signupForm);
  //     // passMatch = (passAgain.value == pass.value);
  //     //payload = new URLSearchParams(formData).toString();
  //   }
  // }



  console.log("form data: ", formData);
  console.log("payload: ", payload);

  const usrEP = `http://introweb.tech/api/Users/login`;

  console.log("paylod for login: ", payload);

  // let oReq = new XMLHttpRequest();
  // oReq.open('POST', usrEP, true);
  //
  // oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  //oReq.addEventListener("load", handleResponse);

  //oReq.send(payload);
}


window.onload = submitBtn.addEventListener("click", submitRequest);
