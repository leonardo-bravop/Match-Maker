const express = require("express");
const router = express.Router();
const invitationsController = require("../controllers/invitationsController")

router.delete("/deleteAll", invitationsController.deleteAll)

router.delete("/invitAcepted", invitationsController.invitationAcepted)

router.delete("/invitRejected", invitationsController.invitationRejected)

module.exports = router;