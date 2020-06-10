const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

let usersPath = path.join(__dirname, "..", "data", "users.json");

function getUsers() {
    let users = fs.readFileSync(usersPath, "utf8");
    return users != "" ? JSON.parse(users) : [];
}
let usuarios = getUsers();

function getUserByEmail(email) {
    return usuarios.find((user) => user.email == email);
}

function getUserById(id) {
    return usuarios.find((user) => user.id == id);
}

function generateId() {
    if (usuarios.length) {
        let ids = usuarios.map((user) => user.id);
        return Math.max(...ids) + 1;
    } else {
        return 1;
    }
}

function guardarUsuario(usuario) {
    usuarios.push(usuario);
    fs.writeFileSync(usersPath, JSON.stringify(usuarios, null, " "));
}

const controller = {
    processLogin: (req, res, next) => {
        let userLog = getUserByEmail(req.body.email);

        //console.log(passNoEncriptado);
        //console.log(userLog.pass);
        //console.log(userLog.email);

        if (userLog) {
            if (bcrypt.compareSync(req.body.pass, userLog.pass)) {
                //inicio de session
                // si se usa el delete pass la caga cuando queres logear por segunda vez el mismo user, no se bien por que?! por eso cree el objeto nuevo sin pass.
                //delete userLog.pass;
                let userSession = {
                    id: userLog.id,
                    firstName: userLog.firstName,
                    lastName: userLog.lastName,
                    email: userLog.email,
                    avatar: userLog.avatar,
                };
                req.session.logedUser = userSession;

                //aca deberia ir la cookie

                //redirecciona a profile + id user
                res.redirect(`/profile/${userLog.id}`);
            } else {
                res.send("Contraseña incorrecta");
            }
        } else {
            res.send("Usuario inexistente");
        }
    },
    logout: (req, res) => {
        //req.session.destroy()
        //res.locals.frontLogedUser = null
        req.session.destroy((err) => {
            res.redirect("/");
        });
        //res.redirect('/');
    },
    register: (req, res) => {
        res.render("register", { title: "Registro" });
    },
    userAdd: (req, res, next) => {
        delete req.body.repass;
        req.body.pass = bcrypt.hashSync(req.body.pass, 10);
        let newUser = {
            id: generateId(),
            ...req.body,
            avatar: req.files[0].filename,
        };
        guardarUsuario(newUser);
        res.redirect("/");
    },
    profile: (req, res) => {
        let loggedUser = getUserById(req.params.id);
        res.render("profile", {
            title: `Perfil de ${loggedUser.firstName}`,
            loggedUser,
        });
    },
};

module.exports = controller;
