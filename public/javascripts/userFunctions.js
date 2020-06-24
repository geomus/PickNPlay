const fs = require("fs");
const path = require("path");

let usersPath = path.join(__dirname,'..', "..","src", "data", "users.json");

function getUsers() {
    let users = fs.readFileSync(usersPath, "utf8");
    return users != "" ? JSON.parse(users) : [];
}
let usuarios = getUsers();

module.exports={
    getUsers:  getUsers(),
    getUserByEmail: (email)=>{
        return usuarios.find((user) => user.email == email);
    },
    getUserById: (id)=>{
        return usuarios.find((user) => user.id == id);
    },
    generateId: ()=>{
        if (usuarios.length) {
            let ids = usuarios.map((user) => user.id);
            return Math.max(...ids) + 1;
        } else {
            return 1;
        }
    },
    guardarUsuario: (usuario)=>{
        usuarios.push(usuario);
        fs.writeFileSync(usersPath, JSON.stringify(usuarios, null, " "));
    }
};