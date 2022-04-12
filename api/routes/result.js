const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController")

router.put("/updateResult/:resultId/match/:matchId/user/:userId", resultController.updateResult)

router.put("/confirmationTeam/:team/:resultId/:matchId", resultController.confirmResultTeam);

module.exports = router;