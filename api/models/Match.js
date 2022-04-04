const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  league: [
    {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
  ],
  equipo_1: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  equipo_2: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  fecha: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "pending",
  },
  result: [
    {
      type: Schema.Types.ObjectId,
      ref: "Result",
    },
  ],
});

const Match = mongoose.model("match", matchSchema);
module.exports = Match;
