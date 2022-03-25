const User = require("../models/Users");
const generateToken = require("../config/generateToken");


exports.register = (req, res) => {
  const { name, surname, email, password, age } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400);
        throw new Error("User Already Exists");
      } else {
        User.create({ name, surname, email, password, age })
          .then((user) => {
            res.json({
              _id: user._id,
              name: user.name,
              surname: user.surname,
              email: user.email,
            });
          })
          .catch((error) => {
            res.json({ message: error });
          });
      }
    })
    .catch((error) => {
      res.json({ message: error });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      user
        .matchPassword(password)
        .then((result) => {
          if (result) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              token: generateToken(user._id),
            });
          } else {
            res.status(400);
            throw new Error("An error ocurred");
          }
        })
        .catch((error) => {
          res.json({ message: "Email or password invalid" });
        });
    } else {
      res.status(400);
      throw new Error("An error ocurred");
    }
  });
};

exports.edit = (req, res) => {
    const {_id} = req.params
    const {name, surname,  age} = req.body

    User.updateOne({_id}, {name, surname, age}).then(result=>{
        res.send(result)
    })
}

exports.getGroups = (req, res) => {

}