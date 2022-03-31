const Invitation = require("../models/Invitation")

  exports.deleteAll = (req, res) => {
    Invitation.deleteMany().then((data) => {
      res.send(data)
    })
  };
