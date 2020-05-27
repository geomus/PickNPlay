// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//Multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../public/images/imgInstrumentos'))
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productsController');
const usersController = require('../controllers/usersController');

/* HOME */
router.get('/', mainController.home);

/* PRODUCTS */
// Listado productos
router.get('/products', productsController.list);
// Agregar productos
router.get('/products/create', productsController.productAdd);
router.post('/products/create', upload.any(), productsController.add);
// Detalle producto
router.get('/products/:id', productsController.detalle);
// Eliminar producto
router.delete('/products/delete/:id', productsController.delete);
// Editar productos
router.get('/products/:id/edit', productsController.editView);
router.put('/products/:id/edit', upload.any(), productsController.edit);

/* USERS */
// Registro usuarios
router.get('/register', mainController.register);
// Login
router.post('/products', usersController.processLogin);

router.get('/carrito', mainController.carrito);

module.exports = router;