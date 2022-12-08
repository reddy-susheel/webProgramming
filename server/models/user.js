// // "database" as object literal
// const users = [
//     {
//       userId: 12345,
//       userName: "cathy123",
//       password: "icecream"
//     },
//     {
//       userId: 55555,
//       userName: "fredburger",
//       password: "badpassword"
//     },
//     {
//       userId: 23412,
//       userName: "bobbyjones",
//       password: "hi"
//     }
//   ];
  
//   function getAllUsers() {
//     return users;
//   }
  
//   function login(user) { // {userName: "sda", password: "gsdhjsga"}
//     let cUser = users.filter( u => u.userName === user.userName);
    
//     if(!cUser[0]) throw Error("Username not found");
//     if(cUser[0].password !== user.password) throw Error("Password incorrect");
  
//     return cUser[0];
//   }
  
//   module.exports = { getAllUsers, login };

const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    emailID VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllUsers() {
  const sql = `SELECT * FROM users;`;
  let users = await con.query(sql);
  console.log(users)
}

// Create  User - Registering
async function register(user) {
  let cUser = await getUser(user);
  if(cUser.length > 0) throw Error("emailID is already in use");

  const sql = `INSERT INTO users (firstName, lastName, emailID, password)
    VALUES ("${user.firstName}", "${user.lastName}", "${user.emailID}", "${user.password}");
  `
  await con.query(sql);
  return await login(user);
}

// Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
  
  if(!cUser[0]) throw Error("emailID not found");
  if(cUser[0].password !== user.password) throw Error("Password incorrect");

  return cUser[0];
}

// Update User function
async function editUser(user) {
  let sql = `UPDATE users 
    SET emailID = "${user.emailID}"
    WHERE userID = ${user.userID}
  `;

  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
}

// Delete User function
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userID}
  `
  await con.query(sql);
}

// Useful Functions
async function getUser(user) {
  let sql;

  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE emailID = "${user.emailID}"
  `;
  }
  return await con.query(sql);  
}

/*
let cathy = {
  userID: 5,
  userName: "cathy123",
  password: "icecream"
}; 

login(cathy);
*/

module.exports = { getAllUsers, login, register, editUser, deleteUser};