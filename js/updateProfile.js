import Manager from "./classes/manager.js";
const manager = new Manager();

const firstName = document.getElementById("first-name");
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
let id = parseInt(localStorage.getItem("userIdToUpdate"));

// func -> edit user details
window.updateProfile = () => {
  const validFirstName = validateName(firstName);
  const validLastName = validateName(lastName);
  const validEmail = validateEmail(email);

  if (!validFirstName || !validLastName || !validEmail) {
    if (!validFirstName) {
      displayErrorMsg(firstName, "Invalid first name");
      return;
    }
     
    if (!validLastName) {
      displayErrorMsg(lastName, "Invalid last name");
      return;
    }
      
    if (!validEmail) {
      displayErrorMsg(email, "Invalid email address");
      return;
    } 
  } else {
    if (firstName.value !== "")
      manager.updateFirstName(id, firstName.value);
    if (lastName.value !== "")
      manager.updateLastName(id, lastName.value);
    if (email.value !== "")
      manager.updateEmail(id, email.value);

    displaySuccessMsg();
  }
  // update first name
  // if (validateName(firstName)) {
  //   if (firstName.value !== "") {
  //     
  //     displaySuccessMsg();
  //   }
  // } else {
  //   displayErrorMsg(firstName, "Invalid first name");
  //   return;
  // }

  // // update last name
  // if (validateName(lastName)) {
  //   if (lastName.validateName !== "") {
  //     manager.updateLastName(id, lastName.value);
  //     displaySuccessMsg();
  //   }
  // } else {
  //   displayErrorMsg(lastName, "Invalid last name");
  //   return;
  // }

  // // update email
  // if(validateEmail(email)) {
  //   if(email.value !== "") {
  //     manager.updateEmail(id, email.value);
  //     displaySuccessMsg();
  //   } else {
  //     displayErrorMsg(email, "Invalid email address");
  //     return;
  //   }
  // }
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

// // func -> check if password field valid
// window.validatePassword = password => {
//   isPasswordValid = true;

//   if (password.value.length < 8) {
//     isPasswordValid = false;
//     displayErrorMsg(password, "Password must include at least 8 characters.");
//   } else hideErrorMsg(password);
//   toggleBtn();
// }

// func -> activate and disabled button
// function toggleBtn() {
//   const formBtn = document.querySelector(".form-btn");

//   if (isNameValid || isEmailValid || isPasswordValid)
//     formBtn.disabled = false;
//   else formBtn.disabled = true;
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
function displaySuccessMsg() {
  const success = document.getElementById("success");
  success.classList.remove("hide-element");
  document.querySelector(".success-text").textContent = 'Details have been successfully update';

  setTimeout(() => {
    // window.location.href = "/login.html";
  }, 3000);
}