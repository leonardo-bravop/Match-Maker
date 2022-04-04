const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController")

router.get("/getAll", leagueController.getAll)

router.post("/new", leagueController.new);

router.put("/addUser/:id", leagueController.addUser);

router.put("/deleteUser/:id", leagueController.deleteUser);

router.get("/getUsers/:leagueId", leagueController.getUserByLeagueId)

// router.post("/newLeague", leagueController.newLeague);

router.delete("/deleteLeague/:id", leagueController.deleteLeague);

router.get("/showLeague/:id", leagueController.findShowLeague);

router.put("/changeLeague/:id", leagueController.changeLeague);

router.get("/findLeague/", leagueController.findLeagueByName);

router.get("/showHistory/:id", leagueController.showHistoryLeague);

module.exports = router;
