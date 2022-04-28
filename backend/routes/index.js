const express = require('express');
const userRoute = require('./user.route');
const contactRoute = require('./contact.route');
const contactController = require('../controller/contact.controller');

const router = express.Router();

router.use("/user", userRoute)
router.use("/contact", contactRoute)
router.get("/uploads/:name", contactController.getFile)

module.exports = router;