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
      played: Boolean,
      gameListId: String,
      personalRating: Number,
      // user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //    ref: "User" }
  });






module.exports = model("Adventure", adventureSchema);