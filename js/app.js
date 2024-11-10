import Manager from "./classes/manager.js";
const manager = new Manager();

const signupError = document.querySelector(".signup-error");
const singupBtn = document.querySelector(".signup-btn");
const usersTableDetails = document.querySelector(".users-details");

const inputValidator = {
  "name": false,
  "email": false,
  "password": false
};

singupBtn.addEventListener("click", signup);

// func -> validate first & last name
window.validateName = function validateName(name) {
  // only allows alphabets, spaces, or hyphens 
  const namePattern = /^[a-zA-Z\s-]+$/;
  const nameArr = name.getAttribute("name");
  inputValidator[nameArr] = true;

  if (!namePattern.test(name.value)) {
    inputValidator[nameArr] = false;
    displayError(nameArr);
  } else
    hideError();

  disableBtn();
};

// func -> validate email 
window.validateEmail = function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailArr = email.getAttribute("name");
  inputValidator[emailArr] = true;

  if (!emailPattern.test(email.value)) {
    inputValidator[emailArr] = false;
    displayError(emailArr);
  } else
    hideError();

  disableBtn();
}

// func -> validate password
window.validatePassword = function validatePassword(password) {
  const passwordArr = password.getAttribute("name");
  inputValidator[passwordArr] = true;

  if (password.value.length < 8) {
    inputValidator[passwordArr] = false;
    displayError(passwordArr);
  } else
    hideError();
  disableBtn();
}

// func -> display error msg
function displayError(arr) {
  const errorMsg = {
    "name": "name must contain only letters",
    "email": "Invalid email formt",
    "password": "Password must be at least 8 characters long.",
    "existUser": `Sorry, we couldn't register you, because the user already exists`,
  }

  signupError.classList.remove("hide-element");
  signupError.textContent = errorMsg[arr];
}

// func -> hide error msg
function hideError() {
  signupError.classList.add("hide-element");
}

// fun -> disable / active btn
function disableBtn() {
  // check if all values in the object are true.
  // i.e if the data is valid.
  let allTrue = Object.keys(inputValidator).every(input => inputValidator[input] == true);

  // if data is valid un-disable the signup button
  if (allTrue) {
    singupBtn.disabled = false;
    singupBtn.classList.remove("disabled-btn");
    singupBtn.classList.add("active-btn");
  } else {
    singupBtn.disabled = true;
    singupBtn.classList.add("disabled-btn");
    singupBtn.classList.remove("active-btn");
  }
};

function signup() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (manager.doesUserExist(email))
    displayError("existUser");
  else {
    manager.addUser(firstName, lastName, email, password);
    showUsersTable()
  }
 
  clearInputs();
}

function showUsersTable() {
  // when user click the signup button, show the users list section.
  document.querySelector(".users").classList.remove("hide-element");
  usersTableDetails.innerHTML = "";

  for(let user of manager.users)
    usersTableDetails.innerHTML += `
      <tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>
          <button class="users-btn delete-btn" onclick="deleteUser(${user.id})">
            <i class='bx bx-trash'></i>
          </button>
        </td>
      </tr>`;
}

window.deleteUser = function deleteUser(id) {
  manager.deleteUser(id);
  showUsersTable();
}

function clearInputs() {
  document.getElementById("first-name").value = "";
  document.getElementById("last-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

disableBtn();
