const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const driveRouter = require('./controller/drive');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// Use the CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(driveRouter);

app.get("/", (_req, res) => {
    res.send("API Working...");
});

mongoose.connect(DB_URL)
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.log("mongoDB connection failed: ", err.message));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
