import { fetchData, setCurrentUser } from './main.js'

// user class
class User {
  constructor(firstname, lastname, eMail, password) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.emailID = eMail;
    this.password = password;
  }

  getUsername() {
    return this.emailID;
  }
}

// login functionality
let loginForm = document.getElementById("loginForm");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
  e.preventDefault();

  let eMail = document.getElementById("eMail").value;
  let password = document.getElementById("pwd").value;
  let user = new User("","",eMail, password);

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
let regForm = document.getElementById("registerForm");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();

  let firstname = document.getElementById("fName").value;
  let lastname = document.getElementById("lName").value;
  let eMail = document.getElementById("eMail").value;
  let password = document.getElementById("cPwd").value;
  let user = new User(firstname, lastname, eMail, password);

  fetchData("/users/register", user, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "login.html";
  })
  .catch((err) =>{
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}