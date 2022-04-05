const mongoose = require("mongoose");
const { Schema } = mongoose;

const inivitationSchema = new Schema({
  fromId: [
    {
      matchId: { type: Schema.Types.ObjectId, ref: "match" },
      leagueId: { type: Schema.Types.ObjectId, ref: "league" }
    },
  ],
  toId: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  status: {
    type: String,
    default: "pending",
  },
});

const Invitation = mongoose.model("invitation", inivitationSchema);
module.exports = Invitation;
