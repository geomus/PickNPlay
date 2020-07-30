let db = require("../../database/models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const { validationResult } = require("express-validator");
// const { Op } = db.Sequelize;
//let cors = requiere ('cors')

const controller = {
    list: async (req, res) =>{
        const users = await db.Users.findAll();
        res.json({
            meta:{
                status: 200,
                count: users.length,
                link: '/api/users/'
            },
            data: users.map(user => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName:user.lastName,
                    email: user.email,
                    detail: `/api/profile/${user.id}`
                }
            })
        })

    },
    // processLogin: (req, res, next) => {
    //     let errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         console.log(errors);
    //         res.send(errors);
    //     } else {
    //         db.Users.findOne({
    //             where: {
    //                 email: req.body.email,
    //             },
    //         })
    //             .then((userLog) => {
    //                 if (userLog) {
    //                     if (bcrypt.compareSync(req.body.pass, userLog.pass)) {
    //                         //inicio de session
    //                         // si se usa el delete pass para no mandar el password a la sesion la caga (debe generar un asincronismo),cuando queres logear por segunda vez el mismo user, no se bien por que?! por eso cree el objeto nuevo sin pass, me parece funcionaria tambien con un callback.
    //                         let userSession = {
    //                             id: userLog.id,
    //                             firstName: userLog.firstName,
    //                             lastName: userLog.lastName,
    //                             email: userLog.email,
    //                             avatar: userLog.avatar,
    //                             isAdmin: userLog.isAdmin,
    //                         };
    //                         req.session.logedUser = userSession;
    //                         //cookie
    //                         if (req.body.remember) {
    //                             //recordamos el usuario por 3 meses
    //                             res.cookie("userLog", userLog, {
    //                                 maxAge: 1000 * 60 * 60 * 24 * 90,
    //                             });
    //                             res.redirect(`/users/profile/${userLog.id}`);
    //                         } else {
    //                             //redirecciona a profile + id user
    //                             res.redirect(`/users/profile/${userLog.id}`);
    //                         }
    //                     } else {
    //                         res.send("Contraseña incorrecta");
    //                     }
    //                 } else {
    //                     res.send("Usuario inexistente");
    //                 }
    //             })
    //             .catch((error) => console.log(error));
    //     }
    // },
    // logout: (req, res) => {
    //     //eliminar cookie de recordar
    //     res.clearCookie("userLog");
    //     req.session.destroy((err) => {
    //         res.redirect("/");
    //     });
    // },
    // register: (req, res) => {
    //     res.render("register", { title: "Registro" });
    // },
    // userAdd: async (req, res, next) => {
    //     let errors = validationResult(req);
    //     //console.log(errors);
    //     //console.log(req.files[0]);

    //     if (!errors.isEmpty()) {
    //         if (req.files[0]) {
    //             let imagenABorrar = path.join(
    //                 __dirname,
    //                 `../../public/images/userAvatars/${req.files[0].filename}`
    //             );
    //             fs.unlinkSync(imagenABorrar);
    //         }

    //         console.log(errors);
    //         res.redirect('/');
    //     } else {
    //         delete req.body.repass;
    //         req.body.pass = bcrypt.hashSync(req.body.pass, 10);
    //         let newUser = {
    //             ...req.body,
    //             isAdmin: 0,
    //             avatar: req.files[0].filename,
    //         };
    //         await db.Users.create(newUser);
    //         //una vez logueado, iniciarle la sesion
    //         let userLog = await db.Users.findOne({
    //             where: {
    //                 email: newUser.email,
    //             },
    //         });
    //         let userSession = {
    //             id: userLog.id,
    //             firstName: userLog.firstName,
    //             lastName: userLog.lastName,
    //             email: userLog.email,
    //             avatar: userLog.avatar,
    //             isAdmin: userLog.isAdmin,
    //         };
    //         req.session.logedUser = userSession;
    //         res.redirect("/");
    //     }
    // },
    profile: async (req, res) => {
        const user = await db.Users.findByPk(req.params.id)
        res.json({
            meta:{
                status: 200,
                link: `/api/profile/${user.id}`
            },
            data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    rating: user.rating,
                    avatar: user.avatar,
                    
                }
            });
    },


    
    // edit: async (req, res) => {
    //     let user = await db.Users.findByPk(req.params.id);
    //     res.render("userEdit", {
    //         title: "Editar usuario",
    //         user,
    //     }).catch((error) => console.log(error));
    // },
    // update: (req, res) => {
    //     let errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         console.log(errors);
    //         res.redirect('/');
    //     } else {
    //         // preparar el body
    //         let _body = {
    //             ...req.body,
    //             id: req.session.logedUser.id,
    //             avatar: req.files[0].filename,
    //             isAdmin: req.session.logedUser.isAdmin,
    //         };
    //         db.Users.update(_body, {
    //             where: { id: req.params.id },
    //         })
    //             .then(() => res.redirect(`/users/profile/${req.params.id}`))
    //             .catch((error) => console.log(error));
    //     }
    // },
    // delete: async (req, res) => {
    //     await db.Users.destroy({ where: { id: req.params.id } });
    //     // borrar avatar
    //     var avatarPath = path.join(
    //         __dirname,
    //         `../../public/images/userAvatars/${req.session.logedUser.avatar}`
    //     );
    //     await fs.unlinkSync(avatarPath);
    //     // eliminar cookies y session
    //     res.clearCookie("userLog");
    //     req.session.destroy();
    //     res.redirect("/");
    // },
};

module.exports = controller;
