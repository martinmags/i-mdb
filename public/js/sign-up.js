const signUpBtn = document.getElementById("signup-btn");
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const signupLoginContainerTop = document.getElementById("signup-login-container-top");
const signUpLoginContainerBottom = document.getElementById("signup-login-container-bottom");

signUpBtn.addEventListener("click", turnToSignUp);
function turnToSignUp(){
  loginContainer.style= "animation: showOut 2s forwards";
  signupContainer.style="animation: showIn 2s forwards";
  loginContainer.style.display = "none";
  signupContainer.style.display = "block";
}

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", turnToLogin);
function turnToLogin(){
  loginContainer.style= "animation: showOut 2s reverse"; 
  signupContainer.style="animation: showIn 2s reverse";
  loginContainer.style.display = "block";
  signupContainer.style.display = "none";

}






















