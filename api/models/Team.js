const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  match: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
});

const Team = mongoose.model("team", teamSchema);
module.exports = Team;
