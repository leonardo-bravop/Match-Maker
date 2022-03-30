const League = require("../models/League");
const User = require("../models/Users");

exports.new = (req, res) => {
  const { name, description } = req.body;
  console.log(`req body es`, req.body);
  League.findOne({ name })
    .then((league) => {
      if (league) {
        res.status(400);
        throw new Error("League Already Exists");
      } else {
        console.log(`name es`, name);
        League.create({ name, description })
          .then((league) => {
            console.log("entre");
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
  console.log(`id es`, id);
  console.log(`userid es`, userId);
  League.findByIdAndUpdate(
    id,
    { $push: { users: userId } },
    { new: true, useFindAndModify: false }
  ).then(() => {
    User.findByIdAndUpdate(
      userId,
      { $push: { leagues: id } },
      { new: true, useFindAndModify: false }
    ).then(()=>res.sendStatus(200))
  });
};

exports.newLeague = (req, res) => {
  const { name, description, matches, users } = req.body;
  League.create({
    name: name,
    description: description,
    matches: matches, 
    users: users
  }
  ).then((data) => {
    res.send(data)
  })
};
exports.deleteLeague = (req, res) => {
  const { id } = req.params;
  League.deleteOne({ where: id}
  ).then((data) => {
    res.send(data)
  })
};

exports.findShowLeague = (req, res) => {
  const { id } = req.params;
  League.findById({ where: id}
  ).then((data) => {
    res.send(data)
  })
};

exports.changeLeague = (req, res) => {
  const { id } = req.params;
  const {name, description, matches, users } = req.body
  League.updateOne(
    { name: name,
      description: description,
      matches: matches, 
      users: users},
    { where: id})
    .then((data) => {
      res.send(data)
    })
}

exports.getAll = (req, res) => {
  League.find({}
  ).then((data) => {
    res.send(data)
  })
};

exports.showHistoryLeague = (req, res) => {

}

