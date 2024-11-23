import Manager from "./classes/manager.js";

const manager = new Manager();
const error = document.getElementById("error");
const usersTitle = document.getElementById("users-title");
const usersSubtitle = document.getElementById("users-subtitle");
let registeredUser;

document.getElementById("login-btn").addEventListener('click', login);

// func -> check if first and last name fileds are valid.
window.validateName = name => {
  const namePattern = /^[a-zA-Z\s-]+$/;
  if (!namePattern.test(name.value))
    return false;
  else
    return true;
}

// func -> check if email / password fileds are empty
window.isFieldsEmpty = (inputField) => {
  if (inputField.value === "") {
    displayErrorMsg(inputField, "This field can't be empty");
    return true;
  } else {
    hideErrorMsg(inputField);
    return false;
  }
}

// func -> log in user to the system
function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // check that input fileds arent empty.
  if (!isFieldsEmpty(email) && !isFieldsEmpty(password)) {
    registeredUser = manager.login(email.value, password.value);

    if (registeredUser !== null) {
      registeredUser.permissions ? showUsersDetailsForAdmin() : showUserDetails();
    } else {
      const errorMsg = "Invalid email or password"
      displayErrorMsg(email, errorMsg);
      displayErrorMsg(password, errorMsg);
    }
    clearInputs();
  }
}

// func -> display all registered user (for admin users)
function showUsersDetailsForAdmin() {
  document.querySelector(".users").classList.remove("hide-element");
  document.querySelector(".users-details").innerHTML = "";

  // change title and subtitle
  usersTitle.textContent = "Admin Dashboard."
  usersSubtitle.textContent = "Here you can delete users account, update users to admin and logout users from the system."

  for (let user of manager.users) {
    const tr = document.createElement("tr");

    if (user.login) {
      tr.innerHTML =
        ` <td>${user.firstName}</td>
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
          </td>`;
    } else {
      tr.innerHTML =
        ` <td>${user.firstName}</td>
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
          </td>`;
    }

    if (user.permissions) {
      tr.innerHTML += `<td>Admin</td>`
      tr.className = "admin";
    }

    document.querySelector(".users-details").appendChild(tr);
  }
}

// func => display user details for regular users 
function showUserDetails() {
  document.querySelector(".users").classList.remove("hide-element");

  // change title and subtitle
  usersTitle.textContent = `${registeredUser.firstName} ${registeredUser.lastName} Profile`;
  usersSubtitle.textContent = "Here you can delete your account, update your details and logout from the system."

  document.querySelector(".users-details").innerHTML = `<tr>
    <td>${registeredUser.firstName}</td>
    <td>${registeredUser.lastName}</td>
    <td>${registeredUser.email}</td>
    <td>${registeredUser.password}</td>

    <td>
      <button class="users-btn delete-btn" onclick="deleteUser(${registeredUser.id})">
        <i class='bx bx-trash'></i>
      </button>
    </td>

    <td>
      <button class="users-btn edit-btn" onclick="openEditUserProfile(${registeredUser.id})">
        <i class='bx bx-edit'></i>
      </button>
    </td>

    <td>
      <button class="users-btn logout-btn" onclick="logoutUser(${registeredUser.id})">
        <i class='bx bx-log-out'></i>
      </button>
    </td>
  </tr>`;

}

// func -> remove user
window.deleteUser = id => {
  manager.deleteUser(id);
  displaySuccessMsg(`user removed successfully.`);

  // check if user delete himself 
  if (registeredUser.id !== id)
    // no => check if user admin
    // admin => show all users, user => show only his profile
    registeredUser.permissions ? showUsersDetailsForAdmin() : " ";
  else document.querySelector(".users").classList.add("hide-element");
}

// func -> log out user from system
// only the user himself can log himself from the system
window.logoutUser = function logoutUser(id) {
  manager.logout(id);
  displaySuccessMsg("user logout successfuly");

  if (registeredUser.id !== id)
    registeredUser.permissions ? showUsersDetailsForAdmin() : " ";
  else
    document.querySelector(".users").classList.add("hide-element");
}

// func -> open edit profile page
window.openEditUserProfile = id => {
  document.querySelector(".edit").classList.remove("hide-element");

  document.getElementById("edit-btn").addEventListener('click', editUserProfile(id));
}

// func -> edit user details
// function editUserProfile(id) {
//   const firstName = document.getElementById("edit-firstName");

//   if (validateName(firstName) && firstName.value !== "") {
//     manager.editFirstName(id, firstName);
//     displaySuccessMsg(`Details have been successfully update`);
//   } else
// }

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

// func -> clear input fields after signup
function clearInputs() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}