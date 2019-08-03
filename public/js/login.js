
//Some degree of messaging or fallback in noscript or API failure situations
//You will also have to build some mechanism to login and logout of your simple CRUD
//application ==> LOGOUT!!


var loginForm = document.querySelector('#login-form');
var submitBtn = document.querySelector('#logSubmit');
const baseAPI = `http://introweb.tech/api`;

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
    //console.log("respont text: ", JSON.parse(respText));

    const access_token = prsdText.id;

    localStorage.setItem('access_token', access_token);

    console.log("access_token: ", access_token);
    console.log("got access_token successfully\nredirecting to content (movielist) page");
    window.location.replace('styledcrud.html');
    console.log("LOGIN SUCESSFULL");

    //console.log(JSON.parse(httpResp));

    //console.log("all response headers: ", typeof httpResp);
  //}
}


//HANDLE LOGIN VALIDATION SOMEWHERE AROUND HERE
function submitRequest (e) {
  //IMPORTANT: NEED THIS SO PAGE DOESNT REFRESH ON SUBMIT, WHICH CLEARS
  //THE HTTP REQUEST AND IT FAILS
  e.preventDefault();
  let formData = new FormData(loginForm);
  let payload = new URLSearchParams(formData).toString();

  const usrEP = `http://introweb.tech/api/Users/login`;

  console.log("paylod for login: ", payload);

  let oReq = new XMLHttpRequest();
  oReq.open('POST', usrEP, true);

  oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  oReq.addEventListener("load", handleResponse);
  // => {
  // //oReq.onreadystatechange = function () {
  // let httpResp = oReq.getResponseHeader("Content-Type");
  // let respText = oReq.responseText;
  // let status = oReq.status;
  //
  // console.log("status: code", status);
  // console.log("respont text: ", JSON.parse(respText));
  //
  // const access_token = JSON.parse(respText)['id'];
  //
  // console.log("access_token: ", access_token);
  //
  // console.log(JSON.parse(httpResp));
  //
  // console.log("all response headers: ", typeof httpResp); //};
  // });

  //oReq.setRequestHeader("Set-Cookie");
  oReq.send(payload);
}


submitBtn.addEventListener("click", submitRequest);


export {loginForm, submitRequest, handleResponse};
