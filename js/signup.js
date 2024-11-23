import Manager from "./classes/manager.js";

const manager = new Manager();
const error = document.getElementById("error");
let isNameValid = false, isEmailValid = false, isPasswordValid = false;

// func -> check if first and last name fileds are valid.
// i.e contain only letters
window.validateName = name => {
  const namePattern = /^[a-zA-Z\s-]+$/;
  isNameValid = true;

  if (!namePattern.test(name.value)) {
    isNameValid = false;
    displayErrorMsg(name, "name must contain only letters");
  } else hideErrorMsg(name);

  toggleBtn();
}

// func -> check if email filed valid
// i.e pattern = user@email.com
window.validateEmail = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid = true;

  if (!emailPattern.test(email.value)) {
    isEmailValid = false;
    displayErrorMsg(email, "Please enter a valid email address.")
  } else hideErrorMsg(email);

  toggleBtn();
}

// func -> check if password field valid
// i.e length is at least 8 characters long.
window.validatePassword = password => {
  isPasswordValid = true;

  if (password.value.length < 8) {
    isPasswordValid = false;
    displayErrorMsg(password, "Password must include at least 8 characters.");
  } else hideErrorMsg(password);

  toggleBtn();
}

// func -> signup user to the system
window.signup = () => {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (manager.addUser(firstName, lastName, email, password)) {
    displaySuccessMsg("User successfully added.");
    // window.location.href = "/login.html";
  } else {
    displayErrorMsg("", "User already exists in the system.")
    setTimeout(hideErrorMsg(""), 5000);
  }
  clearInputs();
}

// func -> display error msg to the user
function displayErrorMsg(inputField, errorMsg) {
  error.classList.remove("hide-element");
  document.querySelector(".error-text").textContent = errorMsg;
  if (inputField !== "")
    inputField.classList.add("error-border");
}

// func -> hide error msg when input is valid
function hideErrorMsg(inputField) {
  error.classList.add("hide-element");
  if (inputField !== "")
    inputField.classList.remove("error-border");
}

// func -> display success msg to the user
function displaySuccessMsg(successMsg) {
  const success = document.getElementById("success");
  success.classList.remove("hide-element");
  document.querySelector(".success-text").textContent = successMsg;

  setTimeout(() => {
    success.classList.add("hide-element");
  }, 3000);
}

// func -> activate and disabled button
function toggleBtn() {
  const formBtn = document.querySelector(".form-btn");
  if (isNameValid && isEmailValid && isPasswordValid)
    formBtn.disabled = false;
  else formBtn.disabled = true;
}

// func -> clear input fields after signup
function clearInputs() {
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
