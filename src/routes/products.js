// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, validationResult, body} = require ('express-validator');

//Multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../public/images/imgInstrumentos'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var uploadProducts = multer({ storage: storage });

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Middlewares Require ************
const adminUser = require('../middlewares/adminUser');

/* PRODUCTS */
// Listado productos
router.get('/', productsController.list);
// Agregar productos
router.get('/create',adminUser, productsController.productAdd);
router.post('/create',[check('discount').isInt({min:0, max:99}).withMessage('0 < % < 99')], uploadProducts.any(), productsController.add);
// Detalle producto
router.get('/:id', productsController.detalle);
// Eliminar producto
router.delete('/delete/:id', productsController.delete);
// Editar productos
router.get('/:id/edit', productsController.editView);
router.put('/:id/edit', uploadProducts.any(), productsController.edit);

module.exports = router;