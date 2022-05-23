const router = require("express").Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");
const idgbWebApi = require('igdb-api-node').default;


const axios = require("axios");

const rawQueryString = 'fields a,b,c;limit 50;offset 0;';

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
        {data: 'fields name;'},
        { 
            headers: 
            { 
                'Client-ID': process.env.TWITCH_CLIENT_ID, 
                'Authorization': ` ${process.env.TWITCH_APP_ACCESS_TOKEN}`
            },

          
        },

    )
    
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
});



router.post("/games", (req, res, next) => {
    console.log("hello")
axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': process.env.TWITCH_APP_ACCESS_TOKEN
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
  })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });
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