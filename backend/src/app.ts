import express from "express";
import cors from "cors";
import { errorConverter, handleErrors } from "./middleware/handleError";
import api from "./routes/index";

const app = express();
//enable cors
app.use(cors());

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//routing
app.use("/", api);

//error handling
app.use(errorConverter);
app.use(handleErrors);

export default app;
