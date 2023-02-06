const mongoose = require("mongoose");

const Annexlly = new mongoose.Schema({
  name: "String",
  defaultUrl: "String",
  id: "String",
  newPath: "String",
  numOfClicks: "Number",
  createdAt: { type: Date, default: Date.now },
  userId: "String",
});

module.exports = mongoose.model("Annexlly Links", Annexlly);
