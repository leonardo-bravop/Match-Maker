const Invitation = require("../models/Invitation");

exports.deleteAll = (req, res, next) => {
  Invitation.deleteMany()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      next(new Error(error));
    });
};

exports.matchInvitationAcepted = (req, res, next) => {
  const { matchId, userId } = req.params;
  Invitation.findOne({
    $and: [{ "fromId.matchId": matchId }, { toId: userId }],
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      next(new Error(error));
    });
};

exports.invitationRejected = (req, res, next) => {
  const { id } = req.params;
  Invitation.updateOne({ where: id }, { status: rejected })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      next(new Error(error));
    });
};
