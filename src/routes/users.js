// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, validationResult, body} = require ('express-validator');

//Multer
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
const usersController = require('../controllers/usersController');

// ************ Middlewares Require ************
const loggedUser = require('../middlewares/loggedUser');
const guestUser = require('../middlewares/guestUser');

/* USERS */
// Registro usuarios
router.get('/register', guestUser, usersController.register);
router.post('/register', uploadUsers.any(), usersController.userAdd);
// Login
router.post('/login', guestUser, usersController.processLogin);
router.post('/logout', usersController.logout);
// Profile
router.get('/profile/:id', loggedUser, usersController.profile);

module.exports = router;