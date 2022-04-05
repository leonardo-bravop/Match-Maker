const Invitation = require("../models/Invitation")

  exports.deleteAll = (req, res) => {
    Invitation.deleteMany().then((data) => {
      res.send(data)
    })
  };

  exports.invitationAcepted = (req, res) => {
    const { id } = req.params;
    Invitation.updateOne(
      { where: id },
      { status: accepted })
    .then((data) => {
      res.send(data)
    })
  };

  exports.invitationRejected = (req, res) => {
    const { id } = req.params;
    Invitation.updateOne(
      { where: id },
      { status: rejected })
    .then((data) => {
      res.send(data)
    })
  };
