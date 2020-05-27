// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//Multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, path.join(__dirname,'../public/images/products'))
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productsController');

/* GET - home page. */
router.get('/', mainController.home);

router.get('/products', productsController.list);

router.get('/products/create', productsController.productAdd);
router.post('/products/create', upload.any(), productsController.add);

router.get('/products/:id', productsController.detalle);
router.delete('/products/delete/:id', productsController.delete);

router.get('/products/:id/edit', productsController.editView);
router.put('/products/:id/edit', productsController.edit);

router.get('/carrito', mainController.carrito);

router.get('/register', mainController.register);

module.exports = router;