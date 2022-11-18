const register_form = document.getElementById("fillTheBlanks");
if(register_form) register_form.addEventListener("submit", userCreator);

function userCreator(e){
    e.preventDefault();
    let firstName = ((document.getElementById("fName")||{}).value)||"";
    let lastName = ((document.getElementById("lName")||{}).value)||"";
    let username = ((document.getElementById("uName/eMail")||{}).value)||"";
    let password = ((document.getElementById("pwd")||{}).value)||"";
    let note = ((document.getElementById("notes")||{}).value)||"";
    const newUser = new helper(firstName,lastName,username,password,note);
    console.log(newUser);
}


function helper(firstname,lastname,username,password,note){
    this.firstName = firstname;
    this.lastName = lastname; 
    this.username = username;
    this.password = password;
    this.note = note;
}


helper.prototype.setNote = function(note){
    this.note = note;
}

helper.prototype.setFirstname = function(firstname){
    this.firstName = firstname;
}

helper.prototype.setLastname = function(lastname){
    this.lastName = lastname;
}

helper.prototype.setUsername = function(username){
    this.userName = username;
}

helper.prototype.setPassword = function(password){
   this.password = password;
}

helper.prototype.getNote = function(){
    return this.note;
}

helper.prototype.getFirstname = function(){
    return this.firstName;
}

helper.prototype.getLastname = function(){
    return this.lastName;
}

helper.prototype.getUsername = function(){
    return this.username;
}

helper.prototype.getPassword = function(){
   return this.password;
}

