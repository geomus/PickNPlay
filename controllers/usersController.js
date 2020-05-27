const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');

let usersPath = path.join(__dirname, "..", "data", "users.json");

function getUsers() {
    let users = fs.readFileSync(usersPath, "utf8");
    return users != "" ? JSON.parse(users) : [];
}
let usuarios = getUsers();

function getUserByEmail(email){
    return usuarios.find(user => user.email == email)
};

const controller = {
    processLogin:(req, res,next) => {
        let usuario = getUserByEmail(req.body.email);
        if(usuario != undefined ){
            if(bcrypt.compareSync(req.body.pass,usuario.pass)){
                res.redirect(`/profile/${usuario.id}`)
            } else {
                res.send('La contraseña no es correcta')
            }
        } else {
            res.send('Ese usuario no existe')
        };
    }
};

module.exports = controller;