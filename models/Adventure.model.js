const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");


const adventureSchema = new Schema({
    name: { 
        type: String,
        mandatory: true,
      },
      image: String,
      difficulty: String,
      date: String,
      notes: String,
      played: String,
      gameListId: String,
      personalRating: Number,
    totalRating: Number,
    description: String,
    summary: String
  });






module.exports = model("Adventure", adventureSchema);