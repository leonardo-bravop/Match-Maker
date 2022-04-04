const mongoose = require("mongoose");
const { Schema } = mongoose;

const eloSchema = new Schema({
  value: 
    {
        type: Number,
        default: 800
    },
  league: [
    {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Elo = mongoose.model("elo", eloSchema);
module.exports = Elo;