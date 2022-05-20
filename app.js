// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");


// ℹ️ Connects to the database
require("./db");
//const idgbWebApi = require('igdb-api-node').default;

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();


// const igdbApi = idgbWebApi({
//     clientId: process.env.TWITCH_CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     accessToken: process.env.TWITCH_APP_ACCESS_TOKEN

// });



    




// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use("/api/auth", require("./routes/auth.routes"));  
app.use("/api", require("./routes/adventure.routes"));
app.use("/api", require("./routes/game.routes"));
app.use("/api",  require("./routes/index.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
