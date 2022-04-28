const express = require('express');
const app = express();
const cors = require('cors');
const { handleErrors } = require('./middlerware/handleError');
const routes = require("./routes/index")
//enable cors
app.use(cors());

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => { res.send("API Working") })

//routing
app.use("/", routes);
app.use(handleErrors)

module.exports = app;