import Manager from "./classes/manager.js";

const manager = new Manager();
const loginBtn = document.querySelector(".login-btn");
const signupError = document.querySelector(".signup-error");
let registeredUser;

loginBtn.addEventListener("click", login);

// func -> check if email / password fileds are empty
window.validetInput = function validetInput(input) {
  if (input.value === "") {
    input.classList.add("error-border");
    return false;
  } else {
    input.classList.remove("error-border");
    return true;
  }
}

// func -> log in user to the system
function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // check that input fileds arent empty.
  if (validetInput(email) && validetInput(password)) {
    registeredUser = manager.login(email.value, password.value);

    if (registeredUser !== null) {
      signupError.classList.add("hide-element");
      showUsersTable();
    } else
      signupError.classList.remove("hide-element");
  }
  clearInputs();
}

// func => display all registered user
function showUsersTable() {
  document.querySelector(".users").classList.remove("hide-element");
  document.querySelector(".users-details").innerHTML = "";

  for (let user of manager.users) {
    if (user.login)
      document.querySelector(".users-details").innerHTML +=
        `<tr>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>
            <button class="users-btn delete-btn" onclick="deleteUser(${user.id})">
              <i class='bx bx-trash'></i>
            </button>
          </td>
          <td>
            <button class="users-btn logout-btn" onclick="logoutUser(${user.id})">
              <i class='bx bx-log-out'></i>
            </button>
          </td>
        </tr>`;
    else
      document.querySelector(".users-details").innerHTML +=
        `<tr>
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
}

// func -> log out user from system
// only the user himself can log himself from the system
window.logoutUser = function logoutUser(id) {
  if (registeredUser.id === id) {
    manager.logout(id);
    showUsersTable();
  }
}

// func -> delete user from the system
// only the user himself can delete himself from the system
window.deleteUser = function deleteUser(id) {
  if (registeredUser.id === id) {
    manager.deleteUser(id);
    showUsersTable();
  }
}

function clearInputs() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}