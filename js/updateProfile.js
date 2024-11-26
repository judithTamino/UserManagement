import Manager from "./classes/manager.js";
const manager = new Manager();

const firstName = document.getElementById("first-name");
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
let userRole;
let id = parseInt(localStorage.getItem("userIdToUpdate"));

window.onload = () => {
  const userToUpdate = manager.findUser(id);

  firstName.placeholder = `${userToUpdate.firstName}`;
  lastName.placeholder = `${userToUpdate.lastName}`;
  email.placeholder = `${userToUpdate.email}`;
  password.placeholder = `${userToUpdate.password}`;

  // if user is admin display the option to make other users admin.
  const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
  const permissionsContainer = document.getElementById("permissions-container");

  if (registeredUser.permissions) {
    permissionsContainer.classList.remove("hide-element");
    userRole = document.getElementById("permissions");
  } else
    permissionsContainer.classList.add("hide-element");
}

// func -> edit user profile (when use is admin)


// func -> edit user details
window.updateProfile = () => {
  const validFirstName = validateName(firstName);
  const validLastName = validateName(lastName);
  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);

  if (!validFirstName || !validLastName || !validEmail || !validPassword) {
    if (!validFirstName)
      displayErrorMsg(firstName, "Invalid first name.");
    else if (!validLastName)
      displayErrorMsg(lastName, "Invalid last name.");
    else if (!validEmail)
      displayErrorMsg(email, "Invalid email address.");
    else
      displayErrorMsg(password, "Password must include at least 8 characters.");
  } else {

    if (firstName.value === "" && lastName.value === "" && email.value === "" && password.value === "") {
      if (userRole !== undefined) {
        if (userRole.value === "") {
          displayErrorMsg("", "Please fill in at least one of the fields.")
          return;
        }
      } else {
        displayErrorMsg("", "Please fill in at least one of the fields.");
        return;
      }
    }

    // update first name
    if (firstName.value !== "") {
      manager.updateFirstName(id, firstName.value);
      displaySuccessMsg();
    }

    // update last name
    if (lastName.value !== "") {
      manager.updateLastName(id, lastName.value);
      displaySuccessMsg();
    }

    // update email
    if (email.value !== "") {
      manager.updateEmail(id, email.value);
      displaySuccessMsg();
    }

    // update password
    if (password.value !== "") {
      manager.updatePassword(id, password.value);
      displaySuccessMsg();
    }

    // update user role
    if (userRole !== undefined)
      if (userRole.value !== "") {
        manager.changePermissions(id, userRole.value);
        displaySuccessMsg();
      }
    clearInputs();
  }
}

// func -> check if first and last name fileds are valid.
window.validateName = name => {
  const namePattern = /^[a-zA-Z\s-]+$/;

  if (namePattern.test(name.value) || name.value === "") {
    hideErrorMsg(name);
    return true;
  }
  return false;
}

// func -> check if email filed valid
window.validateEmail = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email.value) || email.value === "") {
    hideErrorMsg(email);
    return true;
  }
  return false;
}

// func -> check if password field valid
window.validatePassword = password => {
  if (password.value.length >= 8 || password.value === "") {
    hideErrorMsg(password);
    return true;
  }
  return false;
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
function displaySuccessMsg() {
  const success = document.getElementById("success");
  success.classList.remove("hide-element");
  document.querySelector(".success-text").textContent = 'Details have been successfully update';

  setTimeout(() => {
    window.location.href = "/login.html";
  }, 3000);
}

// func -> clear input fields after signup
function clearInputs() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
}