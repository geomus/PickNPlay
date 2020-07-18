// ************ Require's ************
const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const usersApiController = require('../../controllers/api/usersApiController')

//Multer
// var storage2 = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../../public/images/userAvatars"));
//     },
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });
// var uploadUsers = multer({ storage: storage2 });

/* USERS */
//  Todos los usuarios
router.get("/users", usersApiController.list);

// // Registro usuarios
// router.post("/register", uploadUsers.any(),usersApiController.userAdd
// );

// // Login
// router.post("/login", usersApiController.processLogin
// );
// router.post("/logout", usersApiController.logout);

// // Profile
router.get("/profile/:id",  usersApiController.profile);
// // Edit
// router.put(
//     "/:id/edit",
//     uploadUsers.any(), usersApiController.update
// );
// // Delete
// router.get("/:id/delete",  usersApiController.delete);

module.exports = router;
