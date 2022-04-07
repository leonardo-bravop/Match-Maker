const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController")

router.get("/getAll/private/:isPrivate", leagueController.getAll)

router.post("/new", leagueController.new);

router.put("/:leagueId/addUser/:userId", leagueController.addUser);

router.put("/:leagueId/deleteUser/:userId", leagueController.deleteUser);

router.get("/getUsers/:leagueId", leagueController.getUserByLeagueId)

// router.post("/newLeague", leagueController.newLeague);

router.delete("/deleteLeague/:id", leagueController.deleteLeague);

router.get("/showLeague/:id", leagueController.findShowLeague);

router.put("/editLeague/:id", leagueController.editLeague);

router.get("/findLeague/", leagueController.findLeagueByName);

router.get("/showHistory/:leagueId", leagueController.showHistoryLeague);

module.exports = router;
