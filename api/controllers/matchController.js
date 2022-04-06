const Match = require("../models/Match");
const User = require("../models/Users");
const Invitation = require("../models/Invitation");
const League = require("../models/League");
const Result = require("../models/Result");

//falta verificar que la longitud de team_1 sea igual a la de team_2
exports.newMatch = (req, res, next) => {
  const { team_1, team_2, league, invitationText, date, time } = req.body;
  Match.create({ team_1, team_2, league, invitationText, date, time }).then(
    (match) => {
      const equipos = team_1.concat(team_2);
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
            team_1.map((userId) =>
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
            team_2.map((userId) =>
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
        .then((finalMatch) => res.send(finalMatch))
        .catch((error) => {
          res.status(400);
          next(new Error(error));
        });
    }
  );
};

//falta terminar de borrar matchId de todos los documentos que tienen guardado matchId
exports.deleteMatch = (req, res, next) => {
  const { id } = req.params;
  let matchDirection;
  Match.findById(id)
    .then((match) => {
      matchDirection = match;
      console.log("Match es", match);
      const promisesArray = match.team_1.map((userId) => {
        return User.findById(userId).then((user) => {
          const filteredMatches = user.matches.filter(
            (matchId) => matchId !== id
          );
          user.matches = filteredMatches
          console.log(`user updated es`, user)
          return user.save()
        });
      })
      return Promise.all(promisesArray)
    })
    .then(() => {
      res.send(matchDirection);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.findMatch = (req, res, next) => {
  const { id } = req.params;
  Match.findById(id)
    .populate({ path: "league", select: "name sport description color img" })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.deleteAll = (req, res, next) => {
  Match.deleteMany()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};
