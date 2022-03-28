const mongoose = require("mongoose");
const { Schema } = mongoose;

const leagueSchema = new Schema({
  name: String,
  description: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const League = mongoose.model("league", leagueSchema);
module.exports = League;
