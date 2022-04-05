const Invitation = require("../models/Invitation")

  exports.deleteAll = (req, res) => {
    Invitation.deleteMany().then((data) => {
      res.send(data)
    })
  };

  exports.matchInvitationAcepted = (req, res) => {
    const {matchId, userId} = req.params
    Invitation.findOne( {$and: [{"fromId.matchId": matchId}, {"toId": userId}]})
    .then((data) => {
      console.log(data)
      res.send(data)
    })
  };

  exports.invitationRejected = (req, res) => {
    Invitation.updateOne({ status: rejected })
    .then((data) => {
      res.send(data)
    })
  };
