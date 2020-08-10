const db = require("../database/models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");

const controller = {
    processLogin: async (req, res, next) => {
        let destacados = await db.Articles.findAll({ include: ["category"] , where:{
            outstanding: 1
        }})
        let errorsL = validationResult(req);
        if (!errorsL.isEmpty()) {

            let showModal = "/javascripts/popModal.js";
            console.log(errorsL);
            res.render('index',{title: 'Home', destacados, errorsL:errorsL, showModal:showModal, puntoMil:toThousand});
        } else {
            db.Users.findOne({
                where: {
                    email: req.body.email,
                },
            })
                .then((userLog) => {
                    if (userLog) {
                        if (bcrypt.compareSync(req.body.pass, userLog.pass)) {
                            //inicio de session
                            // si se usa el delete pass para no mandar el password a la sesion la caga (debe generar un asincronismo),cuando queres logear por segunda vez el mismo user, no se bien por que?! por eso cree el objeto nuevo sin pass, me parece funcionaria tambien con un callback.
                            let userSession = {
                                id: userLog.id,
                                firstName: userLog.firstName,
                                lastName: userLog.lastName,
                                email: userLog.email,
                                avatar: userLog.avatar,
                                isAdmin: userLog.isAdmin,
                            };
                            req.session.logedUser = userSession;
                            //cookie
                            if (req.body.remember) {
                                //recordamos el usuario por 3 meses
                                res.cookie("userLog", userLog, {
                                    maxAge: 1000 * 60 * 60 * 24 * 90,
                                });
                                res.redirect(`/users/profile/${userLog.id}`);
                            } else {
                                //redirecciona a profile + id user
                                res.redirect(`/users/profile/${userLog.id}`);
                            }
                        } else {
                            res.send("Contraseña incorrecta");
                        }
                    } else {
                        res.send("Usuario inexistente");
                    }
                })
                .catch((error) => console.log(error));
        }
    },
    logout: (req, res) => {
        //eliminar cookie de recordar
        res.clearCookie("userLog");
        req.session.destroy((err) => {
            res.redirect("/");
        });
    },
    register: (req, res) => {
        res.render("register", { title: "Registro"});
    },
    userAdd: async (req, res, next) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (req.files[0]) {
                let imagenABorrar = path.join(
                    __dirname,
                    `../../public/images/userAvatars/${req.files[0].filename}`
                );
                fs.unlinkSync(imagenABorrar);
            }

            console.log(errors);
            res.redirect('/');
        } else {
            delete req.body.repass;
            req.body.pass = bcrypt.hashSync(req.body.pass, 10);
            let newUser = {
                ...req.body,
                isAdmin: 0,
                avatar: req.files[0].filename,
            };
            await db.Users.create(newUser);
            //una vez logueado, iniciarle la sesion
            let userLog = await db.Users.findOne({
                where: {
                    email: newUser.email,
                },
            });
            let userSession = {
                id: userLog.id,
                firstName: userLog.firstName,
                lastName: userLog.lastName,
                email: userLog.email,
                avatar: userLog.avatar,
                isAdmin: userLog.isAdmin,
            };
            req.session.logedUser = userSession;
            res.redirect("/");
        }
    },
    profile: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then((loggedUser) =>
                res.render("profile", {
                    title: `Perfil de ${loggedUser.firstName}`,
                    loggedUser
                })
            )
            .catch((error) => console.log(error));
    },
    edit: async (req, res) => {
        let user = await db.Users.findByPk(req.params.id);
        res.render("userEdit", {
            title: "Editar usuario",
            user
        }).catch((error) => console.log(error));
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.redirect('/');
        } else {
            // preparar el body
            let _body = {
                ...req.body,
                id: req.session.logedUser.id,
                avatar: req.files[0].filename,
                isAdmin: req.session.logedUser.isAdmin,
            };
            db.Users.update(_body, {
                where: { id: req.params.id },
            })
                .then(() => res.redirect(`/users/profile/${req.params.id}`))
                .catch((error) => console.log(error));
        }
    },
    delete: async (req, res) => {
        await db.Users.destroy({ where: { id: req.params.id } });
        // borrar avatar
        var avatarPath = path.join(
            __dirname,
            `../../public/images/userAvatars/${req.session.logedUser.avatar}`
        );
        await fs.unlinkSync(avatarPath);
        // eliminar cookies y session
        res.clearCookie("userLog");
        req.session.destroy();
        res.redirect("/");
    },
};

module.exports = controller;
