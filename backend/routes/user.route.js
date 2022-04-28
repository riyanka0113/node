const express = require('express');
const { wrapper } = require('../middlerware/handleError');
const userController = require('../controller/user.controller');

const router = express.Router();

router.post("/register", wrapper(userController.register))
router.post("/login", wrapper(userController.login))

module.exports = router