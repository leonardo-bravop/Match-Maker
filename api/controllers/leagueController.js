const League = require("../models/League");
const User = require("../models/Users");

exports.new = (req, res) => {
  const { name, description, sport, color, img } = req.body;
  League.findOne({ name })
    .then((league) => {
      if (league) {
        res.status(400);
        throw new Error("League Already Exists");
      } else {
        League.create({ name, description, sport, color, img })
          .then((league) => {
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

exports.addUser = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  League.findByIdAndUpdate(
    id,
    { $push: { users: userId } },
    { new: true, useFindAndModify: false }
  ).then(() => {
    User.findByIdAndUpdate(
      userId,
      { $push: { leagues: id } },
      { new: true, useFindAndModify: false }
    ).then((users) => res.send(users));
  });
};

// exports.newLeague = (req, res) => {
//   const { name, description, matches, users, img } = req.body;
//   League.create({
//     name: name,
//     description: description,
//     matches: matches,
//     users: users,
//     img
//   }
//   ).then((data) => {
//     res.send(data)
//   })
// };

exports.deleteLeague = (req, res) => {
  const { id } = req.params;
  League.deleteOne({ _id: id }).then((data) => {
    res.send(data);
  });
};

//get league by id
exports.findShowLeague = (req, res) => {
  const { id } = req.params;
  League.findById(id).then((data) => {
    res.send(data);
  });
};

exports.getAll = (req, res) => {
  League.find({}).then((data) => {
    res.send(data);
  });
};

//edit
exports.changeLeague = (req, res) => {
  const { id } = req.params;
  const { name, description, matches, users } = req.body;
  League.updateOne(
    { name: name, description: description, matches: matches, users: users },
    { where: id }
  ).then((data) => {
    res.send(data);
  });
};

exports.showHistoryLeague = (req, res) => {};

exports.getUserByLeagueId = (req, res) => {
  const { leagueId } = req.params;
  League.findById(leagueId).then((league) => {
    User.find(
      { _id: { $in: league.users } },
      { _id: 1, nickname: 1, img: 1 }
    ).then((users) => {
      res.send(users);
    });
  });
};

exports.findLeagueByName = (req, res) => {
  const { leagueName } = req.body;
  League.find({ name: { $regex: leagueName} }).then((leagues) => {
    res.send(leagues);
  })
  // League.find({ $text : { $search: `'${leagueName}'`, $caseSensitive:false } })
  // .then((result) => {
  //   console.log(result);
  // res.send(result);
  // });
};
