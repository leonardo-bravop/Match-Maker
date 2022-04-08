const Match = require("../models/Match");
const User = require("../models/Users");
const Invitation = require("../models/Invitation");
const League = require("../models/League");
const Result = require("../models/Result");

//falta verificar que la longitud de team_1 sea igual a la de team_2
//verificar que un usuario no este en los dos teams
//actualizar invitations para que sean globales, no team 1, team 2
exports.newMatch = (req, res, next) => {
  const { team_1, team_2, league, invitationText, date, time } = req.body;
  Match.create({ team_1, team_2, league, invitationText, date, time }).then(
    (match) => {
      const equipos = team_1.concat(team_2);
      const matchId = match._id.toString();
      Result.create({ match: matchId })
        .then((result) => {
          const resultId = result._id.toString();
          match.result = resultId;
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

exports.deleteMatch = (req, res, next) => {
  const { id } = req.params;
  let matchReference;
  let canDelete;
  Match.findById(id)
    .then((match) => {
      if (match.status !== "confirmed") {
        canDelete = true;
        matchReference = match;
        const usersArray = match.team_1.concat(match.team_2);
        const promisesArray = usersArray.map((userId) => {
          return User.findByIdAndUpdate(userId, { $pull: { matches: id } });
        });
        return Promise.all(promisesArray);
      }
    })
    .then(() => {
      if (canDelete) return Invitation.deleteMany({ "fromId.matchId": id });
    })
    .then(() => {
      if (canDelete)
        return League.findByIdAndUpdate(matchReference.league, {
          $pull: { matches: id },
        });
    })
    .then(() => {
      if (canDelete) return Match.findByIdAndDelete(id);
      else {
        res.status(400);
        next(new Error("Can't delete a confirmed Match"));
      }
    })
    .then((result) => res.send(result))
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

exports.findMatch = (req, res, next) => {
  const { id } = req.params;
  Match.findById(id)
    .populate(
      { path: "league", select: "name sport description color img" },
      { path: "invitations_team1" },
      { path: "invitations_team2" }
    )
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
