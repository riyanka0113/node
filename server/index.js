const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const driveRouter = require('./controller/drive');

const app = express();
const PORT = 5000;
const uri = 'mongodb://0.0.0.0:27017/drive';

// Use the CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(driveRouter);

app.get("/", (_req, res) => {
    res.send("API Working...");
});

mongoose.connect(uri)
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.log("mongoDB connection failed: ", err.message));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
