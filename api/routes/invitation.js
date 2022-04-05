const express = require("express");
const router = express.Router();
const invitationsController = require("../controllers/invitationsController")

router.delete("/deleteAll", invitationsController.deleteAll)

router.put("/invitAcepted/:matchId/user/:userId", invitationsController.matchInvitationAcepted)

router.put("/invitRejected", invitationsController.invitationRejected)

module.exports = router;