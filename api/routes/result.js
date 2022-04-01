const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController")

router.post("/createResult", resultController.createResult)

router.put("/confirmationTeam1/:id", resultController.confirmateResultTeam1);

router.put("/confirmationTeam2/:id", resultController.confirmateResultTeam2);