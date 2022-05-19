const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gameSchema = new Schema(
    {
      name: String,
      franchise: String,
      image: String,
      platforms: Array,
      gameEngines: Array,
      genres: Array,
      category:  { type: String, enum: ["main game", "expansion", "episode", "remake", "remaster"]},
      status: { type: String, enum: ["released", "offline", "cancelled", "rumored", "delisted"]},
      ageRatings: Array,
      totalRating: Number,
      releaseDate: Array,
      storyline: String,
      summary: String,
      themes: Array,
      multiplayerModes: Array,
      expansions: Array,
      gameModes: Array,
      companiesInvolved: Array,
      playerPerspectives: Array,
      similarGames: Array,
      screenshots: Array,
      remasters: Array,
      url: String,
    }
  );
  
  
  module.exports = model("Game", gameSchema);