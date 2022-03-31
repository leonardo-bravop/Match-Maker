const Invitation = require("../models/Invitation")

  exports.deleteAll = (req, res) => {
    Invitation.deleteMany().then((data) => {
      res.send(data)
    })
  };

  exports.invitationAcepted = (req, res) => {
    Invitation.updateOne({ status: accepted })
    .then((data) => {
      res.send(data)
    })
  };

  exports.invitationRejected = (req, res) => {
    Invitation.updateOne({ status: rejected })
    .then((data) => {
      res.send(data)
    })
  };
