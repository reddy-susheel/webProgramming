import { fetchData, getCurrentUser } from './main.js'

// user class
class Note {
  constructor(noteContent, userID) {
    this.noteContent = noteContent;
    this.userID = userID;
  }
}

// login functionality
let noteForm = document.getElementById("noteForm");
if(noteForm) noteForm.addEventListener('submit', saveNote);

let user1 = getCurrentUser();
console.log("us", user1)

function saveNote(e) {
  e.preventDefault();
  let userID = user1.userID;
  let noteContent = document.getElementById("notes").value;
  let note = new Note(noteContent, userID);
  fetchData("/notes/insert", note, "POST")
  .then((note) => {
    console.log("hi")
    window.location.href = "notes.html"
  })
  .catch((err) => {
    console.log("error")
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}