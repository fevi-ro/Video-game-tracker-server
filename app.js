
require("dotenv/config");


// âšī¸ Connects to the database
require("./db");

const express = require("express");

const app = express();




    




// âšī¸ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// đ Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use("/api/auth", require("./routes/auth.routes"));  
app.use("/api", require("./routes/adventure.routes"));
app.use("/api", require("./routes/gameAPI.routes"));
app.use("/api",  require("./routes/index.routes"));

// â To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
