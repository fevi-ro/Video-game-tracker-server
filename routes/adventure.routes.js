const router = require("express").Router();
const mongoose = require("mongoose");
const Adventure = require("../models/Adventure.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// CREATE EVENT

router.post("/adventures", isAuthenticated, (req, res, next) => {
  const {
    name,
    image,
    difficulty,
    date,
  notes,
    played,
    gameListId,
    personalRating,
   totalRating, 
   description,
   summary

  } = req.body;

  const newAdventure = {name,
    image,
    difficulty,
    date,
  notes,
    played,
    gameListId,
    personalRating,
    totalRating,
   description,
   summary
  }

  if (!name) {
    res.status(400).json({ error: "Please add a name" });
    return;
  } 

  Adventure.create(newAdventure)
    .then(response => res.status(201).json(response))
    .catch((error) => {
      next(error);
      res.status(500).json({ error: "Something went wrong, try again" });
    });
});

//GET ADVENTURES

router.get("/adventures", isAuthenticated, (req, res, next) => {
  Adventure.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
      res.status(500).json({
        error: "Sorry, we couldn't retrieve your adventures, please try again",
      });
    });
});



//GET SINGLE ADVENTURE

router.get("/adventures/:advId", isAuthenticated, (req, res, next) => {
  const { advId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(advId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 


  Adventure.findById(advId)
    .then((foundAdventure) => {
      res.status(200).json(foundAdventure);
    })
    .catch((error) => {
      next(error);
      res.status(500).json({
        error: "Something went wrong loading your adventure, please try again",
      });
    });
});

//EDIT SINGLE ADVENTURE

router.put("/adventures/:advId", isAuthenticated, (req, res, next) => {
  const { advId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(advId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }


  const {
    name,
    image,
    difficulty,
    date,
  notes,
    played,
    gameListId,
    personalRating,
    totalRating, 
    description,
    summary
  } = req.body;


  Adventure.findByIdAndUpdate(advId, req.body, { new: true })
  .then((updatedAdventure) => res.json(updatedAdventure))
  
    .catch((error) => {
      next(error);
      res.status(500).json({
        error:
          "Something went wrong while updating your event, please try again",
      });
    });
});

//DELETE SINGLE ADVENTURE

router.delete("/adventures/:advId", isAuthenticated, (req, res, next) => {
  const { advId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(advId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
}

  Adventure.findByIdAndDelete(advId)
  
    .then(() => {
      res.status(200).json({ message: "Adventure has been deleted" });
    })
    .catch((error) => {
      next(error);
      res.status(500).json({
        error:
          "Something went wrong while deleting your adventure, please try again",
      });
    });
});

module.exports = router;