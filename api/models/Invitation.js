const mongoose = require("mongoose");
const { Schema } = mongoose;

const inivitationSchema = new Schema({
  
  matchId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
  toId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  fromId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
      type: String,
      default: 'pending'
  }
});

const Invitation = mongoose.model("invitation", inivitationSchema);
module.exports = Invitation;
