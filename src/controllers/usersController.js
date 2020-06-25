const bcrypt = require("bcrypt");
const functions = require('../../public/javascripts/userFunctions')

const controller = {
    processLogin: (req, res, next) => {
        let userLog = functions.getUserByEmail(req.body.email);

        if (userLog) {
            if (bcrypt.compareSync(req.body.pass, userLog.pass)) {
                //inicio de session
                // si se usa el delete pass la caga cuando queres logear por segunda vez el mismo user, no se bien por que?! por eso cree el objeto nuevo sin pass.
                let userSession = {
                    id: userLog.id,
                    firstName: userLog.firstName,
                    lastName: userLog.lastName,
                    email: userLog.email,
                    avatar: userLog.avatar,
                };
                req.session.logedUser = userSession;

                //aca deberia ir la cookie
                 if (req.body.remember)
                 //recordamos el usuario por 3 meses
                 res.cookie ('userLog',userLog,{maxAge:1000*60*60*24*90})
                //redirecciona a profile + id user
                res.redirect(`/users/profile/${userLog.id}`);
            } else {
                res.send("Contraseña incorrecta");
            }
        } else {
            res.send("Usuario inexistente");
        }
    },
    logout: (req, res) => {
        //eliminar cookie de recordar
        res.clearCookie('userLog')
        req.session.destroy((err) => {
            res.redirect("/");
        });
    },
    register: (req, res) => {
        res.render("register", { title: "Registro" });
    },
    userAdd: (req, res, next) => {
        delete req.body.repass;
        req.body.pass = bcrypt.hashSync(req.body.pass, 10);
        let newUser = {
            id: functions.generateId(),
            ...req.body,
            avatar: req.files[0].filename,
        };
        functions.guardarUsuario(newUser);
        res.redirect("/");
    },
    profile: (req, res) => {
        let loggedUser = functions.getUserById(req.params.id);
        res.render("profile", {
            title: `Perfil de ${loggedUser.firstName}`,
            loggedUser,
        });
    },
};

module.exports = controller;
