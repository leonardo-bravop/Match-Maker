const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController")

router.put("/updateResult/:resultId", resultController.updateResult)

router.put("/confirmationTeam/:team/:resultId", resultController.confirmResultTeam);


module.exports = router;