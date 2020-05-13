// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.home);
router.get('/detalle', mainController.detalle);
router.get('/carrito', mainController.carrito);

module.exports = router;