const express = require('express');
const router = express.Router();
const userCtrl = require('../controleur/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;