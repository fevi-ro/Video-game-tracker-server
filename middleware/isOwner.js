const { default: mongoose } = require("mongoose");
const Adventure = require("../models/Adventure.model");

module.exports = (req, res, next) => {
  const { advId } = req.params;
  Adventure.findById(advId)
  .populate("user")
  .then(adventureDetails => {
    if (adventureDetails.user.id !== req.payload._id){
        console.log("User not authorized to perform this operation", err);
        return res.status(500).json({ message: "User not authorized to perform this operation"});  
    }
    next(); 
  })
};