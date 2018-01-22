"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiController = require("./controllers/api");
// node-restul doesn't have typings, so we'll have to use plain js require to get it :-(
var restful = require('node-restful'); // ===============
console.log(process.env.TEST);
// COMMON VARIABLES
// ===============
let appPort = (process.env.PORT || 3000);
// let connectionString: string = process.env.MONGODB_URI;  
let connectionString = 'mongodb://wcso:wcso@ds161164.mlab.com:61164/wcso';
// ===============
// Express App
// ===============
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", appPort);
app.use(morgan('dev')); // log requests to the console  
app.get("/api/user/", apiController.sample);
mongoose.connect(connectionString);
// ===============
// SERVER
// ===============
let port = app.get("port");
var server = app.listen(port, function () {
    // note: Only for debugging purposes to see that your variables are set correctly...
    console.log("connectionString is: " + connectionString);
    console.log("port is:  " + port);
});
//# sourceMappingURL=index.js.map