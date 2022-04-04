const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController")

router.post("/createResult", resultController.createResult)

router.put("/confirmationTeam/:team/:id", resultController.confirmateResultTeam1);


module.exports = router;