
const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  league: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
    },
  ],
  equipo_1: [
    {
      type: Array,
      ref: "Team",
    },
  ],
  equipo_2: [
    {
      type: Array,
      ref: "Team",
    },
  ],
  Fecha: {
    type: Date,
    default: null,
  },
  Resultado: {
    type: Number,
    default: "",
  },
});

const Match = mongoose.model("match", matchSchema);
module.exports = Match;