// ************ Require's ************
const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const apiController = require('../../controllers/api/apiController')

/* USERS */
//  Todos los usuarios
router.get("/users", apiController.listUsers);

// // Profile
router.get("/users/:id",  apiController.profileOneUser);

/* PRODUCTS */
// Todos los productos
router.get("/products",  apiController.listProducts);

//Un producto
router.get("/products/:id",  apiController.oneProduct);

//ultimo producto cargado
router.get("/lastProduct",  apiController.lastProduct);


module.exports = router;
