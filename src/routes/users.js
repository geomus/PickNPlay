// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
let db = require("../database/models");

//Multer
var storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/userAvatars"));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var uploadUsers = multer({ storage: storage2 });

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

// ************ Middlewares Require ************
const loggedUser = require("../middlewares/loggedUser");
const guestUser = require("../middlewares/guestUser");
const imgControl = require("../middlewares/imgControl");

/* USERS */
// Registro usuarios
router.get("/register", guestUser, usersController.register);
router.post(
    "/register",
    uploadUsers.any(),
    imgControl,
    [
        check("firstName")
            .isLength({ min: 2 })
            .withMessage(
                "En nombre debe tener mas de 2 caracteres y es obligatorio!"
            ),
        check("lastName")
            .isLength({ min: 2 })
            .withMessage(
                "En apellido debe tener mas de 2 caracteres y es obligatorio!"
            ),
        check("email").isEmail().withMessage("Formato de email incorrecto?"),
        body("email")
            .custom(async (value) => {
                //console.log(value);
                let emailsEnUso = await db.Users.findOne({
                    where: { email: value },
                });
                if (emailsEnUso != null) {
                    return Promise.reject();
                } else {
                    return Promise.resolve();
                }
            })
            .withMessage("Ese email ya esta en uso"),
        check("pass")
            .isLength({ min: 8 })
            .withMessage("La contraseña debe tener al menos 8 caracteres!"),
        body("file")
            .custom(function (value) {
                //console.log(value.mimetype);
                if (
                    value.mimetype == "image/jpg" ||
                    value.mimetype == "image/jpeg" ||
                    value.mimetype == "image/png" ||
                    value.mimetype == "image/gif"
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Tipo de imagen invalida!"),
    ],
    usersController.userAdd
);

// Login
router.post(
    "/login",
    guestUser,
    [
        check("email").isEmail().withMessage("Formato de email incorrecto?"),
        body("email")
            .custom(async (value) => {
                //console.log(value);
                let emailsExistente = await db.Users.findOne({
                    where: { email: value },
                });
                if (emailsExistente == null) {
                    return Promise.reject();
                } else {
                    return Promise.resolve();
                }
            })
            .withMessage(
                "No se encuentra registrado ningun usuario con ese email"
            ),
        check("pass")
            .isLength({ min: 1 })
            .withMessage("el campo de contraseña no puede estar vacio"),
        body("pass")
            .custom(async (value, { req }) => {
                let user = await db.Users.findOne({
                    where: { email: req.body.email },
                });
                if(user){
                    if (bcrypt.compareSync(value, user.pass)) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                }else{
                     return Promise.reject();
                }
            })
            .withMessage("contraseña incorrecta "),
    ],
    usersController.processLogin
);
router.post("/logout", usersController.logout);

// Profile
router.get("/profile/:id", loggedUser, usersController.profile);
// Edit
router.get("/:id/edit", loggedUser, usersController.edit);
router.put(
    "/:id/edit",
    loggedUser,
    uploadUsers.any(),
    imgControl,
    [
        check("firstName")
            .isLength({ min: 2 })
            .withMessage(
                "En nombre debe tener mas de 2 caracteres y es obligatorio!"
            ),
        check("lastName")
            .isLength({ min: 2 })
            .withMessage(
                "En apellido debe tener mas de 2 caracteres y es obligatorio!"
            ),
        check("email").isEmail().withMessage("Formato de email incorrecto?"),
        body("file")
            .custom(function (value) {
                if (
                    value.mimetype == "image/jpg" ||
                    value.mimetype == "image/jpeg" ||
                    value.mimetype == "image/png" ||
                    value.mimetype == "image/gif"
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Tipo de imagen invalida!"),
    ],
    usersController.update
);
// Delete
router.get("/:id/delete", loggedUser, usersController.delete);

module.exports = router;
