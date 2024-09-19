
require("dotenv/config");


// ℹ️ Connects to the database
require("./db");

const express = require("express");

const app = express();
/*
var Parse = require('parse/node');

Parse.initialize("DaHDbzfBuszb3y0h3KS8F4Owrf8Cfl4JxFccJKxP","786fVTu3YotR6J3iqN8qabqGPp1chc5OPAlfHOeO"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'

*/
    




// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use("/api/auth", require("./routes/auth.routes"));  
app.use("/api", require("./routes/adventure.routes"));
app.use("/api", require("./routes/gameAPI.routes"));
app.use("/api",  require("./routes/index.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
