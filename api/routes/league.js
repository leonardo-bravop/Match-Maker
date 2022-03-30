const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController")

router.post("/new", leagueController.new);

router.put("/addUser/:id", leagueController.addUser);

router.post("/newLeague", leagueController.newLeague);

router.delete("/deleteLeague/:id", leagueController.deleteLeague);

router.get("/showLeague/:id", leagueController.findShowLeague);

router.put("/changeLeague/:id", leagueController.changeLeague);

router.post("/prueba", (req, res) => {
  res.send(req.body);
});

module.exports = router;
