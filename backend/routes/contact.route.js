const express = require('express');
const { wrapper } = require('../middlerware/handleError');
const contactController = require('../controller/contact.controller');
const isAuth = require("../middlerware/auth");
const imageUpload = require('../middlerware/fileStorage');

const router = express.Router();

router.post("/", isAuth, imageUpload.single("file"), wrapper(contactController.create))
router.get("/", isAuth, wrapper(contactController.get))

module.exports = router