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
  let consolePrint = await con.query(sql);
  console.log(consolePrint)
}

async function insertNotes(note) {
  console.log("26",note.noteContent)
  // let cNote = await getNotes(note);
  // if(cNote.length > 0);
  const sql = `INSERT INTO notes (noteContent, userID)
    VALUES ('${note.noteContent}', ${note.userID});
  `
  return await con.query(sql);
  // return await getNotes(note);
  }

// Update User function
async function editNotes(notes) {
  let sql = `UPDATE notes 
  SET noteContent = "${notes.noteContent}"
  WHERE userID = ${notes.userID}
  ;`;

  await con.query(sql);
  let updatedNote = await getNotes(notes);
  return updatedNote[0];
}

// Delete User function
async function deleteNotes(notes) {
  let sql = `DELETE FROM notes
    WHERE noteID = ${notes.noteID}
  ;`;
  await con.query(sql);
}

// Useful Functions
async function getNotes(notes) {
  let sql;
  sql = `
    SELECT * FROM notes
      WHERE userID = ${notes.userID}
  ;`;
  return await con.query(sql);  
}

async function getMaxId(){
    let sql=`SELECT MAX(noteID) AS maxID FROM notes;
    `;
    return await con.query(sql);
}

function read(note) { // {userName: "sda", password: "gsdhjsga"}
  let Unotes = notes.filter( u => u.note === note.note);
  
  if(!Unotes[0]) throw Error("Note not found");
  // if(cUser[0].password !== user.password) throw Error("Password incorrect");

  return Unotes[0];
}

module.exports = { getAllNotes, insertNotes, getNotes, editNotes, deleteNotes,getMaxId,read};