const generateId = () => {
  let data = localStorage.getItem("users");
  data = JSON.parse(data);

  if (data === null)
    return 0;
  else
    return data.length;
}

let id = generateId() + 1;

class User {
  constructor(firstName, lastName, email, password) {
    this.id = id++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.login = false;
  }
}

export default User;