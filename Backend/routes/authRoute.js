const express = require('express');
const router = express.Router();
const {signin, signup} = require('../controller/userAuthController');

router.post('/signin', signin);

router.post('/signup', signup);

module.exports = router