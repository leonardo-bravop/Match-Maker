const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/edit/:_id", userController.edit);

router.post("/logout", userController.logOut)

router.get("/getLeagues/:userId", userController.getLeaguesByUserId)

// router.get("/getMatches/:userId", userController.getMatchesByUserId)

router.get("/getMatches", userController.getMatchesByUserId)

router.post("/me", userController.verifyToken, userController.me);

module.exports = router;
