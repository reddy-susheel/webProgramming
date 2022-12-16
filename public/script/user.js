import { fetchData, setCurrentUser } from './main.js'

// user class
class User {
  constructor(firstname, lastname, username, pswd) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.emailID = username;
    this.password = pswd;
  }

  getUsername() {
    return this.emailID;
  }
}

// login functionality
let loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
  e.preventDefault();

  let userID = document.getElementById("uName/eMail").value;
  let password = document.getElementById("pwd").value;
  let user = new User(userID, password);

  fetchData("/users/login", user, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "notes.html";
  })
  .catch((err) => {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  }) 
}
 
// register functionality
let regForm = document.getElementById("reg-form");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();

  let firstname = document.getElementById("firstName");
  let lastname = document.getElementById("lastName");
  let userID = document.getElementById("uName/eMail").value;
  let password = document.getElementById("pswd").value;
  let user = new User(firstname, lastname, userID, password);

  fetchData("/users/register", user, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "notes.html";
  })
  .catch((err) =>{
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}