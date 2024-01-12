import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";        


// Preparing ingredients...
const app = express();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));


//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


// Connect db
mongoose.connect(process.env.DB_URL);


// The api
app.get('/', (req, res) => {
  res.json({message: 'Hello, world'})
})


// Serve this awsome app
app.listen(port, () => {
  console.log(`Talima is listening on port ${port}`);
})