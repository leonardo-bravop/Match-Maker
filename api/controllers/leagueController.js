const League = require("../models/League");
const User = require("../models/Users");
const Match = require("../models/Match");
const Elo = require("../models/Elo");

exports.new = (req, res, next) => {
  const { name, sport, description, isPrivate, secretKey, color, img } =
    req.body;
  League.findOne({ name })
    .then((league) => {
      if (league) {
        res.status(400);
        next(new Error("League Already Exists"));
      } else {
        League.create({
          name,
          sport,
          description,
          isPrivate,
          secretKey,
          color,
          img,
        })
          .then((league) => {
            res.status(201).send(league);
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

exports.addUser = (req, res, next) => {
  const { leagueId, userId } = req.params;
  const { enteredKey } = req.body;
  let updatedLeague = {};
  League.findById(leagueId)
    .then((league) => {
      if (!league) {
        res.status(400);
        next(new Error("Invalid leagueId or userId"));
        return false;
      } else if (league.users.includes(userId)) {
        res.status(400);
        next(new Error("User is already in the league"));
        return "already";
      }
      if (league.isPrivate) {
        return league.matchSecretKey(enteredKey);
      } else return true;
    })
    .then((isValid) => {
      if (isValid === true) {
        return League.findByIdAndUpdate(
          leagueId,
          { $push: { users: userId } },
          { new: true, useFindAndModify: false }
        );
      } else if (isValid === "already") {
        return false;
      } else {
        res.status(400);
        next(new Error("Invalid SecretKey"));
        return false;
      }
    })
    .then((league) => {
      if (league) {
        updatedLeague = league;
        return Elo.create({ league: leagueId, user: userId });
      }
    })
    .then((elo) => {
      const eloId = elo._id.toString();
      return User.findByIdAndUpdate(
        userId,
        { $push: { leagues: leagueId, elo: eloId } },
        { new: true, useFindAndModify: false }
      );
    })
    .then((result) => {
      if (updatedLeague._id) {
        res.send(updatedLeague);
      }
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.deleteUser = (req, res, next) => {
  const { leagueId, userId } = req.params;
  League.findById(leagueId).then((league) => {
    console.log("entre al then del league");
    for (let i = 0; i < league.users.length; i++) {
      console.log("entre al for del league");
      if (league.users[i].toString() === userId) {
        console.log("entre al if del league");
        league.users.splice(i, 1);
      }
    }
    league
      .save()
      .then(() => {
        User.findById(userId).then((user) => {
          console.log("entre al then del user");
          for (let j = 0; j < user.leagues.length; j++) {
            console.log("entre al for del user");
            if (user.leagues[j].toString() === leagueId) {
              console.log("entre al if del user");
              user.leagues.splice(j, 1);
            }
          }
          Elo.findOne({ user: userId, league: leagueId }).then((elo) => {
            console.log("entre al then del elo");
            for (let k = 0; k < user.elo.length; k++) {
              console.log("entre al for del elo");
              if (user.elo[k].toString() === elo._id.toString()) {
                console.log("entre al if del elo");
                user.elo.splice(k, 1);
              }
            }
          });
          user.save().then(() => {
            console.log("entre al save del user ");
            Elo.findOneAndDelete({ user: userId, league: leagueId }).then(
              (elo) => {
                console.log("saque el elo");
                res.send("delete elo success");
              }
            );
          });
        });
      })
      .catch((error) => {
        res.status(400);
        next(new Error(error));
      });
  });
};

exports.getUserByLeagueId = (req, res, next) => {
  const { leagueId } = req.params;
  League.findById(leagueId)
    .populate({
      path: "users",
      select: "nickname img elo",
      populate: { path: "elo", match: { league: leagueId }, select: "value" },
    })
    .then(({ users }) => {
      if (users) {
        users.sort((a, b) => {
          if (a["elo"][0] && b["elo"][0]) {
            console.log(`a elo value es`, a["elo"]["0"]["value"]);
            return a["elo"]["0"]["value"] > b["elo"]["0"]["value"]
              ? -1
              : b["elo"]["0"]["value"] > a["elo"]["0"]["value"]
              ? 1
              : 0;
          } else if (!a["elo"][0] && b["elo"][0]) return 1;
          else if (!b["elo"][0] && a["elo"][0]) return -1;
        });
        const rankedUsers = users.map((user, i) => {
          return { rank: i + 1, ...user._doc };
        });
        res.send(rankedUsers);
      } else {
        res.status(400);
        next(new Error("Invalid league id"));
      }
    })
    .catch((error) => {
      res.status(400);
      next(new Error("An error ocurred"));
    });
};

exports.deleteLeague = (req, res, next) => {
  const { id } = req.params;
  League.deleteOne({ _id: id })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

//get league by id
exports.findShowLeague = (req, res, next) => {
  const { id } = req.params;
  League.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

//dividir get all en privadas y publicas
exports.getAll = (req, res, next) => {
  const{isPrivate} = req.params
  League.find({isPrivate})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.editLeague = (req, res, next) => {
  const { id } = req.params;
  const { name, description, users } = req.body;
  League.updateOne(
    { name: name, description: description, users: users },
    { where: id }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.showHistoryLeague = (req, res, next) => {
  const { leagueId } = req.params;
  League.findById(leagueId)
    .then((league) => {
      Match.find({ _id: { $in: league.matches } }).then((users) => {
        res.send(users);
      });
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.findLeagueByName = (req, res, next) => {
  const { leagueName } = req.body;
  if (leagueName) {
    const cleanedName = leagueName
      .trim()
      .split(" ")
      .filter((el) => el !== "");
    let reg = "";
    if (cleanedName.length > 1) {
      reg = cleanedName.join("|");
      reg = "(" + reg + ")";
    } else {
      reg = cleanedName.join("");
    }
    const searchReg = new RegExp(reg, "i");
    League.find({ name: { $regex: searchReg } })
      .select("name")
      .then((leagues) => {
        res.send(leagues);
      })
      .catch((error) => {
        res.status(400);
        next(new Error(error));
      });
    // League.find({ $text : { $search: `'${leagueName}'`, $caseSensitive:false } })
    // .then((result) => {
    //   console.log(result);
    // res.send(result);
    // });
  } else {
    res.status(400);
    next(new Error(error));
  }
};
