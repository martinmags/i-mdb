//module wide variables
var loginForm = document.querySelector('#login-form');
var submitBtn = document.querySelector('#loginSubmit');
const baseAPI = `https://introweb.tech/api`;

/**
 * handleReponseUp
 * - handles reponse of sign up request, used in place of readystatechange
 * @param {event of a login requst being loaded} e 
 */
function handleResponse(e) {
  let oResp = e.target;
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

    //save the access token in localstorage after successfully logged in
    localStorage.setItem('access_token', access_token);

    console.log("access_token: ", access_token);
    console.log("got access_token successfully\nredirecting to content (movielist) page");
    window.location.replace('index.html');
    console.log("LOGIN SUCESSFULL");
}


/**
 * submitRequest
 * - takes in the login form fields and sends a login request for the user
 * 
 * @param {event of a submit being clicked for login} e 
 */
function submitRequest (e) {
  
  //prevents submit from refreshing page onclick
  e.preventDefault();
  let formData = new FormData(loginForm);
  let payload = new URLSearchParams(formData).toString();

  const usrEP = `https://introweb.tech/api/Users/login`;

  console.log("paylod for login: ", payload);

  let oReq = new XMLHttpRequest();
  oReq.open('POST', usrEP, true);

  oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  oReq.addEventListener("load", handleResponse);
  oReq.send(payload);
}

//eventlistener for submit
submitBtn.addEventListener("click", submitRequest);

export {loginForm, submitRequest, handleResponse, baseAPI};
