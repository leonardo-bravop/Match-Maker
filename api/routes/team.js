const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController")


router.post("/newTeam", teamController.newTeam);

router.delete("/deleteMatch/:id", teamController.deleteTeam);

router.get("/showMatch/:id", teamController.changeNameTeam);

module.exports = router;