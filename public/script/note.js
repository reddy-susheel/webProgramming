import { fetchData, setCurrentUser } from './main.js'

// user class
class User {
  constructor(ID, text) {
    this.userID = ID;
    this.noteContent = text;
  }
}

// login functionality
let noteForm = document.getElementById("fillTheBlanks");
if(noteForm) noteForm.addEventListener('submit', saveNote);

function saveNote(e) {
  e.preventDefault();

  let username = document.getElementById("uName/eMail").value;
  let noteText = document.getElementById("notes").value;
  let note = new User(username, noteText);

  fetchData("/notes/insert", note, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.replace = "login.html"
  })
  .catch((err) => {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  }) 
}