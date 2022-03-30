const mongoose = require("mongoose");
const { Schema } = mongoose;

const leagueSchema = new Schema({
  name: String,
  sport: {
    type: String,
    required: true,
  },
  description: String,
  color: {
    type: String,
    default: '#5bc11c'
  },
  img: {
    type: String,
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const League = mongoose.model("league", leagueSchema);
module.exports = League;
