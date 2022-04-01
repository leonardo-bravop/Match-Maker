const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/edit/:_id", userController.edit);

router.post("/logout", userController.logOut)

router.get("/getLeagues/:userId", userController.getLeaguesByUserId)

// router.get("/getMatches/:userId", userController.getMatchesByUserId)

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// router.post("/check", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         mensaje: "token fue creado",
//         authData: authData,
//       });
//     }
//   });
// });

router.get("/getMatches", userController.getMatchesByUserId)

router.post("/me", verifyToken, userController.me);

module.exports = router;
