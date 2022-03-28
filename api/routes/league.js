const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/leagueController")

router.post("/new", leagueController.new);

router.put("/addUser/:id", leagueController.addUser);


router.post("/prueba", (req, res) => {
  res.send(req.body);
});

module.exports = router;
