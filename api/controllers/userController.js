const User = require("../models/Users");
const generateToken = require("../config/generateToken");

exports.register = (req, res) => {
  const { name, surname, nickname, email, password, age } = req.body;
  console.log(`req body es`, req.body)
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400);
        res.send("Email Already Exists")
      }
      else {
        User.findOne({ nickname })
          .then((user) => {
            if (user) {
              res.status(400);
              res.send("Nickname Already Exists")
            }
            else {
              User.create({ name, surname, nickname, email, password, age })
                .then((user) => {
                  console.log('entre')
                  res.sendStatus(201);
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
    })
}

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
              nickname: user.nickname,
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
    }
    else {
      User.findOne({ nickname: email }).then((user) => {
        if (user) {
          user
            .matchPassword(password)
            .then((result) => {
              if (result) {
                res.status(201).json({
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                  nickname: user.nickname,
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
        }
        else {
          res.status(400);
          throw new Error("An error ocurred");
        }
      }
      );
    }
  });
}

exports.edit = (req, res) => {
  const { _id } = req.params
  const { name, surname, nickname, age } = req.body

  User.updateOne({ _id }, { name, surname, nickname, age }).then(result => {
    res.send(result)
  })
}

exports.getGroups = (req, res) => {};

exports.logOut = (req, res) => {
  res.send({});
};
