const router = require("express").Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");
const idgbWebApi = require('igdb-api-node').default;

const axios = require("axios");

const igdb = idgbWebApi({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken: process.env.TWITCH_APP_ACCESS_TOKEN

});


//GET route to fetch all games

router.get("/games", (req, res, next) => {
    console.log("hello")
    axios.post(
        `${process.env.IGDB_API_URL}`,
        {},
        { 
            headers: 
            { 
                'Client-ID': process.env.TWITCH_CLIENT_ID, 
                'Authorization': ` ${process.env.TWITCH_APP_ACCESS_TOKEN}`
            } 
        },
       
    )
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
});



//GET route for one game

router.get("/games/:id", (req, res, next) => {

  axios.post( `${process.env.IGDB_API_URL}/${req.params.id}`,
  {},
  { 
      headers: 
      { 
          'Client-ID': process.env.TWITCH_CLIENT_ID, 
          'Authorization': ` ${process.env.TWITCH_APP_ACCESS_TOKEN}`
      } 
  },
 
)
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
});

module.exports = router;