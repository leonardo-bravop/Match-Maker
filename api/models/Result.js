const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
  score_1: 
    {
        type: String,
        required: [true, "Please, write the team score"],
    },
  score_2: 
    {
        type: String,
        required: [true, "Please, write the team score"],
    },
  confirmation_1: 
    {
        type: Boolean,
        required: [true, "Please, team 1 confirm the result"],
    },
  confirmation_2:
    {
        type: Boolean,
        required: [true, "Please, team 2 confirm the result"],
    },
});

const Match = mongoose.model("match", resultSchema);
module.exports = Match;