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
    Result.create({ match: matchId })
      .then((result) => {
        const resultId = result._id.toString();
        match.result[0] = resultId;
        return match.save();
      })
      .then((updatedMatch) => {
        return League.findByIdAndUpdate(
          league,
          { $push: { matches: matchId } },
          { new: true, useFindAndModify: false }
        );
      })
      .then((updatedLeague) => {
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
      .then((updatedUsers) => {
        return Promise.all(
          equipo_1.map((userId) =>
            Invitation.create({
              fromId: { matchId },
              toId: userId,
            }).then((invitation) => {
              return Match.findByIdAndUpdate(
                matchId,
                {
                  $push: { invitations_team1: invitation._id.toString() },
                },
                { new: true, useFindAndModify: false }
              );
            })
          )
        );
      })
      .then(() => {
        return Promise.all(
          equipo_2.map((userId) =>
            Invitation.create({
              fromId: { matchId: matchId },
              toId: userId,
            }).then((invitation) => {
              return Match.findByIdAndUpdate(
                matchId,
                {
                  $push: { invitations_team2: invitation._id.toString() },
                },
                { new: true, useFindAndModify: false }
              );
            })
          )
        );
      })
      .then((finalMatch) => res.send(finalMatch));
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

//get matches by date
