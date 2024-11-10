import User from "./user.js";

const fetchUsers = () => {
  let users = [],
    data = localStorage.getItem("users");

  if (data !== null)
    users = JSON.parse(data);
  return users;
}

class Manager {
  constructor() {
    this.users = fetchUsers();
  }

  addUser(firstName, lastName, email, password) {
    // add user to users array
    this.users.push(new User(firstName, lastName, email, password));

    // add user to localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id);

    // remove user from localStorage
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  doesUserExist(email) {
    if (this.users.length === 0)
      return false;

    for (let user of this.users)
      if (user.email == email)
        return true;

    return false;
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

    localStorage.setItem("users", JSON.stringify(this.users));
  }
}

export default Manager;