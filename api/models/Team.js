const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  match: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "match",
    },
  ],
});

const Team = mongoose.model("team", teamSchema);
module.exports = Team;
