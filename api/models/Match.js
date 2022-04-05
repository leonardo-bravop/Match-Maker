const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  league: [
    {
      type: Schema.Types.ObjectId,
      ref: "league",
    },
  ],
  equipo_1: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  equipo_2: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  fecha: {
    type: String,
    // default: Date.now(),
  },
  status: {
    type: String,
    default: "pending",
  },
  result: [
    {
      type: Schema.Types.ObjectId,
      ref: "result",
    },
  ],
});

const Match = mongoose.model("match", matchSchema);
module.exports = Match;
