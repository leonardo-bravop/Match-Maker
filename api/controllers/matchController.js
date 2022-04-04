const Match = require("../models/Match");
const User = require("../models/Users");
const Invitation = require("../models/Invitation");
const League = require("../models/League");
const Result = require("../models/Result");

exports.newMatch = (req, res) => {
  const { equipo_1, equipo_2, league } = req.body;
  Match.create({ equipo_1, equipo_2, league }).then((match) => {
    const equipos = equipo_1.concat(equipo_2);
    const matchId = match._id.toString();
    Result.create({ match: matchId }).then((result) => {
      const resultId = result._id.toString();
      Match.findByIdAndUpdate(
        matchId,
        { $push: { result: resultId } },
        { new: true, useFindAndModify: false }
      ).then(() => {
        League.findByIdAndUpdate(
          league,
          { $push: { matches: matchId } },
          { new: true, useFindAndModify: false }
        )
          .then(() => {
            return Promise.all(
              equipos.map((userId) => {
                return User.findByIdAndUpdate(
                  userId,
                  { $push: { matches: matchId } },
                  { new: true, useFindAndModify: false }
                );
              })
            );
          })
          .then(() => {
            console.log(`equipos son`, equipos);
            return Promise.all(
              equipos.map((userId) =>
                Invitation.create({ matchId, toId: userId })
              )
            );
          })
          .then((invitations) => res.send(invitations));
      });
    });
  });
};

exports.deleteMatch = (req, res) => {
  const { id } = req.params;
  Match.deleteOne({ where: id }).then((data) => {
    res.send(data);
  });
};

exports.findMatch = (req, res) => {
  const { id } = req.params;
  Match.findById(id).then((data) => {
    res.send(data);
  });
};

exports.deleteAll = (req, res) => {
  Match.deleteMany().then((data) => {
    res.send(data);
  });
};
