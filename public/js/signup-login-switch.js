/**
 * Controls the animation of switching between signup and login screen.
 * By default, login is presented.
 */

// Targets Elements
const signUpBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");

// Add an event listener to switch to signup
signUpBtn.addEventListener("click", turnToSignUp);
loginBtn.addEventListener("click", turnToLogin);

/**
 * turntoSignup()
 * - performs switch to signup
 */
function turnToSignUp(){
  loginContainer.style= "animation: show .5s forwards";
  signupContainer.style="animation: show .5s reverse";
  loginContainer.style.display = "none";
  signupContainer.style.display = "block";
}

/**
 * turnToLogin()
 * - performs switch to login
 */
function turnToLogin(){
  loginContainer.style= "animation: show .5s reverse"; 
  signupContainer.style="animation: show .5s forwards";
  loginContainer.style.display = "block";
  signupContainer.style.display = "none";
}






















