const Match = require("../models/Match");
const User = require("../models/Users");
const Invitation = require("../models/Invitation");

exports.newMatch = (req, res) => {
  const { equipo_1, equipo_2, fecha } = req.body;
  Match.create({ equipo_1, equipo_2 }).then((match) => {
    const equipos = equipo_1.concat(equipo_2);
    const matchId = match._id.toString();
    return Promise.all(
      equipos.map((userId) => {
        return User.findByIdAndUpdate(
          userId,
          { $push: { matches: matchId } },
          { new: true, useFindAndModify: false }
        )}
      )
    )
      .then(() => {
        console.log(`equipos son`, equipos)
        return Promise.all(
          equipos.map((userId) => Invitation.create({ matchId, toId: userId }))
        );
      })
      .then((invitations) => res.send(invitations));
  });
};

exports.deleteMatch = (req, res) => {
  const { id } = req.params;
  Match.deleteOne({ where: id }).then((data) => {
    res.send(data);
  });
};

exports.deleteAll = (req, res) => {
  Match.deleteMany().then((data) => {
    res.send(data);
  });
};

exports.findMatch = (req, res) => {
  const { id } = req.params;
  Match.findById(id).then((data) => {
    res.send(data);
  });
};
