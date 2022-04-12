const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController")
const userController = require("../controllers/userController")

router.put("/updateResult/match/:matchId/user/:userId", userController.verifyToken , resultController.updateResult)

router.put("/confirmationTeam/:team/:resultId/:matchId", resultController.confirmResultTeam);

module.exports = router;