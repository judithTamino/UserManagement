import User from "./user.js";

// func -> fetch users data from local storage
function fetchUsers() {
  let users = [],
    usersData = JSON.parse(localStorage.getItem("users"));

  if (usersData !== null)
    users = usersData;
  return users;
}

class Manager {
  constructor() {
    this.users = fetchUsers();
  }

  addUser(firstName, lastName, email, password) {
    // check if user exists in the system
    for (let user of this.users)
      // exists -> dont add user to users array and returm false.
      if (user.email === email)
        return false;

    // does not exists -> add new user to users array and save the new array to local storage
    this.users.push(new User(firstName, lastName, email, password));
    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
    return true;
  }

  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id);
    const admins = this.users.filter(user => user.permissions)

    // if admin delete his account and there are no more admins, next user become admin automatically
    if (admins.length === 0 && this.users.length > 0)
      this.users[0].permissions = true;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  login(email, password) {
    for (let user of this.users)
      if (user.email === email && user.password === password) {
        user.login = true;
        localStorage.setItem("users", JSON.stringify(this.users));
        return user;
      }
    return null;
  }

  logout(id) {
    const userToLoggedOut = this.users.findIndex(user => user.id === id)
    this.users[userToLoggedOut].login = false;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  updateFirstName(id, newFirstName) {
    const userIndexToEdit = this.users.findIndex(user => user.id === id);
    this.users[userIndexToEdit].firstName = newFirstName;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  updateLastName(id, newLastName) {
    const userIndexToEdit = this.users.findIndex(user => user.id === id);
    this.users[userIndexToEdit].lastName = newLastName;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  updateEmail(id, newEmail) {
    const userIndexToEdit = this.users.findIndex(user => user.id === id);
    this.users[userIndexToEdit].email = newEmail;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  updatePassword(id, newPassword) {
    const userIndexToEdit = this.users.findIndex(user => user.id === id);
    this.users[userIndexToEdit].password = newPassword;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  findUser(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    return this.users[userIndex];
  }

  changePermissions(id, role) {
    const userIndex = this.users.findIndex(user => user.id === id);
    const admins = this.users.filter(user => user.permissions);

    this.users[userIndex].permissions = role;

    // if admin change his role to user and there are no more admins, the last user become admin automatically
    if (admins.length === 0 && this.users.length > 0)
      this.users[admins.length - 1].permissions = true;

    // update localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}

export default Manager;