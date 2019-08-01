const signUpBtn = document.getElementById("signup-btn");
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const signupLoginContainerTop = document.getElementById("signup-login-container-top");
const signUpLoginContainerBottom = document.getElementById("signup-login-container-bottom");

signUpBtn.addEventListener("click", turnToSignUp);
function turnToSignUp(){
  loginContainer.style= "animation: show .5s forwards";
  signupContainer.style="animation: show .5s reverse";
  loginContainer.style.display = "none";
  signupContainer.style.display = "block";
}

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", turnToLogin);
function turnToLogin(){
  loginContainer.style= "animation: show .5s reverse"; 
  signupContainer.style="animation: show .5s forwards";
  loginContainer.style.display = "block";
  signupContainer.style.display = "none";

}






















