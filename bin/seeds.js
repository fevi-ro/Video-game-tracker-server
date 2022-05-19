require("dotenv").config();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/Video-game-tracker-server";


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });



  const gameData = [
    {
        name: "Donkey Kong Country",
        franchise: "Donkey Kong",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co29n6.png",
        platforms: ["SNES", "Super Famicon"],
        gameEngines: [],
        genres: ["Adventure", "Platform"],
        category:  "main game",
        status: "released",
        ageRatings: [3, 2],
        totalRating: 85,
        releaseDate: [1991, 1994],
        storyline: "Donkey Kong Country is a side-scrolling platform game in which the player must complete 40 levels to recover the Kongs' banana hoard, which has been stolen by the crocodilian Kremlings. The game features both single-player and multiplayer game modes.",
        summary: "The two Kongs travel throughout Donkey Kong Island, battling the Kremlings and their henchmen, before reaching K. Rool's pirate ship, the Gang-Plank Galleon. The two take on K. Rool and seemingly defeat him, initiating a mock credits roll claiming that the Kremlings developed the game, but K. Rool gets back up to continue the fight.[10][11] However, the Kongs persevere, defeat K. Rool, and reclaim the banana hoard.",
        themes: ["Adventure", "Fun"],
        multiplayerModes: [],
        expansions: [],
        gameModes: [],
        companiesInvolved: ["Nintendo", "Rare"],
        playerPerspectives: [],
        similarGames: ["Donkey Kong Quest", "Super Mario" ],
        screenshots: [],
        remasters: [],
        url: "https://en.wikipedia.org/wiki/Donkey_Kong_Country",
      },
      {
        name: "Super Mario World",
        franchise: "Super Mario",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co31e7.png",
        platforms: ["SNES", "Super Famicon"],
        gameEngines: [],
        genres: [ "Platform"],
        category:  "main game",
        status: "released",
        ageRatings: [3, 2],
        totalRating: 83,
        releaseDate: [1995],
        storyline: "Super Mario World is often considered one of the best games in the series and has been cited as one of the greatest video games ever made. It sold more than twenty million copies worldwide, making it the best-selling SNES game",
        summary: "Super Mario World[a] is a 1990 platform game developed by Nintendo for the Super Nintendo Entertainment System (SNES). The story follows Mario's quest to save Princess Toadstool and Dinosaur Land from the series' antagonist Bowser and his minions, the Koopalings. The gameplay is similar to that of earlier Super Mario games: players control Mario or his brother Luigi through a series of levels in which the goal is to reach the goalpost at the end. Super Mario World introduced Yoshi, a dinosaur who can eat enemies, as well as gain abilities by eating the shells of Koopa Troopas.",
        themes: ["Adventure", "Fun"],
        multiplayerModes: [],
        expansions: [],
        gameModes: [],
        companiesInvolved: ["Nintendo", "Hummer Team"],
        playerPerspectives: [],
        similarGames: ["Donkey Kong Quest", "Super Mario Bros", "Legend of Zelda" ],
        screenshots: [],
        remasters: [],
        url: "https://en.wikipedia.org/wiki/Super_Mario_World",
      },
    
];

Game.create(gameData)
  .then((data) => {
    console.log(`${data.length} games have been created`);
  })
  .catch((error) => {
    console.log(error);
  });