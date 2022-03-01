//Imports 
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.modifyAccount)
router.delete('/:id', auth, userCtrl.deleteAccount)

module.exports = router;