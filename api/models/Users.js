const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your Name'],
  },
  surname: {
    type: String,
    required: [true, 'Please enter your Surname'],
  },
  nickname: {
    type: String,
    unique: true,
    required: [true, 'Please enter your Nickname'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Please enter Email Address'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  age: {
    type: String,
    required: [true, 'Please enter your age'],
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/*var validateEmail = function(email) {
  var re = `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`;
  return re.test(email)
};*/

const User = mongoose.model("user", userSchema);
module.exports = User;
