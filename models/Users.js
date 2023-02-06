const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: "String",
  picture: "String",
  email: "String",
  id: "String",
  username: "String",
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UsersSchema);
