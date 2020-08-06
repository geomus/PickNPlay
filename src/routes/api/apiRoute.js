// ************ Require's ************
const express = require("express");
const router = express.Router();
const apiController = require('../../controllers/api/apiController')

/* USERS */
//  Todos los usuarios
router.get("/users", apiController.listUsers);

// Profile
router.get("/users/:id",  apiController.profileOneUser);

/* WIDGETS */
router.get('/widgets',apiController.widgets);

/* PRODUCTS */
// Todos los productos
router.get("/products",  apiController.listProducts);

// Un producto
router.get("/products/:id",  apiController.oneProduct);

// Ultimo producto cargado
router.get("/lastProduct",  apiController.lastProduct);

// Proveedores
router.get("/providers",  apiController.listProviders);

module.exports = router;
