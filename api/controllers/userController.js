const User = require("../models/Users");
const Match = require("../models/Match");
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken");
const League = require("../models/League");

exports.register = (req, res, next) => {
  const { name, surname, nickname, email, password, age } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400);
        next(new Error("Email already exists"));
      } else {
        User.findOne({ nickname })
          .then((user) => {
            if (user) {
              res.status(400);
              next(new Error("Nickname already exists"));
            } else {
              User.create({ name, surname, nickname, email, password, age })
                .then((user) => {
                  res.sendStatus(201);
                })
                .catch((error) => {
                  next(new Error(error));
                });
            }
          })
          .catch((error) => {
            next(new Error(error));
          });
      }
    })
    .catch((error) => {
      next(new Error(error));
    });
};

exports.login = (req, res, next) => {
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
            next(new Error("Password invalid"));
          }
        })
        .catch((error) => {
          res.status(400);
          next(new Error("Password invalid"));
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
                next(new Error("Password invalid"));
              }
            })
            .catch((error) => {
              res.status(400);
              next(new Error("Email or password invalid"));
            });
        } else {
          res.status(400);
          next(new Error("Email/Nickname or password invalid"));
        }
      });
    }
  });
};

exports.edit = (req, res, next) => {
  const { _id } = req.params;
  const { name, surname, nickname, age } = req.body;

  User.updateOne({ _id }, { name, surname, nickname, age })
    .select("name nickname")
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.changePassword = (req, res, next) => {
  const { _id } = req.params;
  const { password } = req.body;

  User.findByIdAndUpdate(_id, { password })
    .select("name nickname")
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.logOut = (req, res, next) => {
  res.send({});
};

exports.me = (req, res, next) => {
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
          res.status(400);
          next(new Error("Email/Nickname or password invalid"));
        });
    }
  });
};

exports.getLeaguesByUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      League.find()
        .where("_id")
        .in(user.leagues)
        .exec()
        .then((leagues) => {
          res.send(leagues);
        })
        .catch((error) => {
          res.status(400);
          next(new Error(error));
        });
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.getMatchesByUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate({
      path: "matches",
      populate: [
        { path: "equipo_1", select: "nickname" },
        { path: "equipo_2", select: "nickname" },
      ],
    })
    .then((user) => {
      res.send(user.matches);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

//update get matches by date
exports.getMatchesByUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate({
      path: "matches",
      populate: [
        { path: "equipo_1", select: "nickname" },
        { path: "equipo_2", select: "nickname" },
      ],
    })
    .then((user) => {
      res.send(user.matches);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.getUserMatchesByDate = (req, res, next) => {
  const { userId, date } = req.params;
  User.findById(userId)
    .populate({
      path: "matches",
      populate: [
        { path: "team_1", select: "nickname" },
        { path: "team_2", select: "nickname" },
      ],
      match: { date },
    })
    .then((user) => {
      res.send(user.matches);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
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
    next(new Error("Invalid token"));
  }
};
