import Manager from "./classes/manager.js";

const manager = new Manager();
const loginBtn = document.querySelector(".login-btn");
const error = document.querySelector(".error");
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
      showUsersTable();
      error.classList.add("hide-element");
    } else {
      const errorMsg = "Invalid email or password"
      displayErrorMessages(errorMsg);
    }
    clearInputs();
  }
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
            <button class="users-btn edit-btn" onclick="editUser(${user.id})">
              <i class='bx bx-edit'></i>
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

          <td>
            <button class="users-btn edit-btn" onclick="editUser(${user.id})">
              <i class='bx bx-edit'></i>
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
  } else {
    const errorMsg = "Sorry, you can only logout from your account"
    displayErrorMessages(errorMsg);
  }
}

// func -> delete user from the system
// only the user himself can delete himself from the system
window.deleteUser = function deleteUser(id) {
  if (registeredUser.id === id) {
    manager.deleteUser(id);
    showUsersTable();
  } else {
    const errorMsg = "Sorry, you can only remove yourself"
    displayErrorMessages(errorMsg);

    // setTimeout(() => {
    //   error.classList.add("hide-element");
    // }, 5000);
  }
}

// func - display error messages
function displayErrorMessages(text) {
  error.classList.remove("hide-element");
  document.querySelector(".error-text").textContent = text;

  setTimeout(() => {
    error.classList.add("hide-element");
  }, 5000);
}

function clearInputs() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}