// func -> generate unique user id
function generateId() {
  const usersData = JSON.parse(localStorage.getItem("users"));

  if (usersData === null)
    return 0;
  else
    return usersData[usersData.length - 1].id + 1;
}

class User {
  constructor(firstName, lastName, email, password) {
    this.id = generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isLogin = false;
    // user with the id = 0, is the admin.
    this.id === 0 ? this.permissions = true : this.permissions = false;
    console.log(this.id);
  }
}

export default User;