const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  age: Number,
  leagues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League"
    }
  ]
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
