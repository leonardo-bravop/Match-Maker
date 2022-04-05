const express = require("express");
const router = express.Router();
const invitationsController = require("../controllers/invitationsController")

router.delete("/deleteAll", invitationsController.deleteAll)

router.delete("/invitAcepted/:id", invitationsController.invitationAcepted)

router.delete("/invitRejected/:id", invitationsController.invitationRejected)

module.exports = router;