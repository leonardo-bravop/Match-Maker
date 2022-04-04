const User = require("../models/Users");
const Match = require('../models/Match')
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken");
const League = require("../models/League");

exports.register = (req, res) => {
  const { name, surname, nickname, email, password, age } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(400);
      res.send("Email Already Exists");
    } else {
      User.findOne({ nickname })
        .then((user) => {
          if (user) {
            res.status(400);
            res.send("Nickname Already Exists");
          } else {
            User.create({ name, surname, nickname, email, password, age })
              .then((user) => {
                res.sendStatus(201);
              })
              .catch((error) => {
                res.json(error);
              });
          }
        })
        .catch((error) => {
          res.json(error);
        });
    }
  }).catch((error) => {
    res.json(error);
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
            res.status(200).json({
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
          res.send("Email or password invalid");
        });
    } else {
      User.findOne({ nickname: email }).then((user) => {
        if (user) {
          user
            .matchPassword(password)
            .then((result) => {
              if (result) {
                res.status(200).json({
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
              res.send("Email or password invalid");
            });
        } else {
          res.status(400);
          throw new Error("An error ocurred");
        }
      });
    }
  });
};

exports.edit = (req, res) => {
  const { _id } = req.params;
  const { name, surname, nickname, age } = req.body;

  User.updateOne({ _id }, { name, surname, nickname, age }).then((result) => {
    res.send(result);
  });
};

exports.getGroups = (req, res) => {};

exports.logOut = (req, res) => {
  res.send({});
};

exports.me = (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findById(authData.id)
        .then((user) =>
          res.json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            nickname: user.nickname,
          })
        )
        .catch((error) => {
          res.send("Email or password invalid");
        });
    }
  });
};

exports.getLeaguesByUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).then((user) => {
    League.find()
      .where("_id")
      .in(user.leagues)
      .exec()
      .then((leagues) => {
        res.send(leagues);
      });
  });
};

exports.getMatchesByUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).then((users) => {
    Match.find(
      { _id: { $in: users.matches } },
    ).then((users) => {
      res.send(users);
    });
  });
};

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// exports.getMatchesByUserId = (req, res) => {
//   const {userId} = req.params
//   User.findById(userId).then(
//     res.send(user.matches)
//   )
// };
