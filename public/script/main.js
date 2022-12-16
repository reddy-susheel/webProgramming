// document.getElementById("btn-users").addEventListener('click', getUsers);

// function getUsers() {
//   fetch("http://localhost:3000/users/")
//   .then((res)=> res.json())
//   .then((data) => console.log(data))
//   .catch((err)=> console.log(err))
// }

// let nav = document.querySelector('nav');

export async function fetchData(route = '', data = {}, GET) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: GET, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }

// const register_form = document.getElementById("fillTheBlanks");
// if(register_form) register_form.addEventListener("submit", userCreator);

// function userCreator(e){
//     e.preventDefault();
//     let firstName = ((document.getElementById("fName")||{}).value)||"";
//     let lastName = ((document.getElementById("lName")||{}).value)||"";
//     let username = ((document.getElementById("uName/eMail")||{}).value)||"";
//     let password = ((document.getElementById("pwd")||{}).value)||"";
//     let note = ((document.getElementById("notes")||{}).value)||"";
//     const newUser = new helper(firstName,lastName,username,password,note);
//     console.log(newUser);
// }


// function helper(firstname,lastname,username,password,note){
//     this.firstName = firstname;
//     this.lastName = lastname; 
//     this.username = username;
//     this.password = password;
//     this.note = note;
// }


// helper.prototype.setNote = function(note){
//     this.note = note;
// }

// helper.prototype.setFirstname = function(firstname){
//     this.firstName = firstname;
// }

// helper.prototype.setLastname = function(lastname){
//     this.lastName = lastname;
// }

// helper.prototype.setUsername = function(username){
//     this.userName = username;
// }

// helper.prototype.setPassword = function(password){
//    this.password = password;
// }

// helper.prototype.getNote = function(){
//     return this.note;
// }

// helper.prototype.getFirstname = function(){
//     return this.firstName;
// }

// helper.prototype.getLastname = function(){
//     return this.lastName;
// }

// helper.prototype.getUsername = function(){
//     return this.username;
// }

// helper.prototype.getPassword = function(){
//    return this.password;
// }

let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// logging in a user
export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// getting current user function
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
export function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}