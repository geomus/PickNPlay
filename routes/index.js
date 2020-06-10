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

var storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../public/images/userAvatars'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var uploadUsers = multer({ storage: storage2 });

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productsController');
const usersController = require('../controllers/usersController');

// ************ Middlewares Require ************
const loggedUser = require('../middlewares/loggedUser');
const guestUser = require('../middlewares/guestUser');
const adminUser = require('../middlewares/adminUser');

/* HOME */
router.get('/', mainController.home);

/* PRODUCTS */
// Listado productos
router.get('/products', productsController.list);
// Agregar productos
router.get('/products/create',adminUser, productsController.productAdd);
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
router.get('/register', guestUser, usersController.register);
router.post('/register', uploadUsers.any(), usersController.userAdd);
// Login
router.post('/login', guestUser, usersController.processLogin);
router.post('/logout', usersController.logout);
// Profile
router.get('/profile/:id', loggedUser, usersController.profile);

router.get('/carrito', mainController.carrito);

module.exports = router;