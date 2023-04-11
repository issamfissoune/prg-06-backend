console.log("Hello PRG06")
require('dotenv').config()
const express = require("express")

const app = express();

const BLRouter  = require("./routers/BLRouter");
const bodyParser = require("body-parser");



const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/BL";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use("/BL",BLRouter );


app.listen(8000, ()=>{
    console.log("server running")
})
