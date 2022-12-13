const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    noteID INT NOT NULL AUTO_INCREMENT,
    noteContent VARCHAR(255),
    userID INT NOT NULL,
    CONSTRAINT notePK PRIMARY KEY(noteID),
    CONSTRAINT noteFK FOREIGN KEY(noteID) references users(userID)
  ); `
  await con.query(sql);
}
createTable();


// grabbing all users in database
async function getAllNotes() {
  const sql = `SELECT * FROM notes;`;
  let comments = await con.query(sql);
  console.log(comments)
}

// async function insert(user) {
//     // let cUser = await getUser(user);
//     // if(cUser.length > 0) throw Error("emailID is already in use");
  
//     const sql = `INSERT INTO notes (notesContent, userID)
//       VALUES ("${user.notesContent}", "${user.userID}");
//     `
//     await con.query(sql);
//     return await login(user);
//   }

async function read(note) { // {userName: "sda", password: "gsdhjsga"}
  let cNote = await getNotes(note); //[{userName: "cathy123", password: "icecream"}]
  
  if(!cNote[0]) throw Error("NoteID not found");
  

  return cNote[0];
}
  

// Update User function
async function editNotes(notes) {
  let sql = `UPDATE notes 
  SET noteContent = "${note.noteContent}"
  WHERE userID = ${note.userID}
  `;

  await con.query(sql);
  let updatedNote = await getNotes(note);
  return updatedNote[0];
}

// Delete User function
async function deletenotes(notes) {
  let sql = `DELETE FROM notes
    WHERE noteID = ${note.noteID}
  `
  await con.query(sql);
}

// Useful Functions
async function getNotes(notes) {
  let sql;

  if(notes.noteID) {
    sql = `
      SELECT * FROM notes
       WHERE userID = ${note.userID}
    `
  } else {
    sql = `
    SELECT * FROM notes
      WHERE noteID = "${notes.noteID}"
  `;
  }
  return await con.query(sql);  
}


const notes = [
    {
        userId: 1,
        noteID:1,
        notetake:"omae shindeiru" 
    },
    {
        userId: 2,
        noteID: 2,
        notetake:"hey yayi ye" 
    }
];

function getAllNotes() {
  return notes;  
}

module.exports = { getAllNotes, read, getNotes, editNotes,deletenotes};