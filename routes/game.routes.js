const router = require("express").Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");
const idgbWebApi = require('igdb-api-node').default;


const igdbApi = idgbWebApi({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken: process.env.TWITCH_APP_ACCESS_TOKEN

});


//GET route to fetch all games

router.get("/", (req, res, next) => {
  Game.find()
    .then((data) => {
      res.status("200").json(data);
    })
    .catch((error) => {
      next(error);
      res.json(error);
    });
});

//GET route for one game

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Game.findById(id)

    .then((foundGame) => {
      if (foundGame) {
        res.status("200").json(foundGame);
      } else {
        res.status("200").json({ message: "Game not found" });
      }
    })
    .catch((error) => {
      next(error);
      res.json(error);
    });
});

module.exports = router;