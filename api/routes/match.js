const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController")

router.post("/newMatch", matchController.newMatch);

router.delete("/deleteMatch/:id", matchController.deleteMatch);

router.get("/showMatch/:id", matchController.findMatch);