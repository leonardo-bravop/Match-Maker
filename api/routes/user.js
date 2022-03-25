const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const userController = require("../controllers/userController")

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/edit/:_id", userController.edit);

router.get("getGroups", userController.getGroups)

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

router.post("/check", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "token fue creado",
        authData: authData,
      });
    }
  });
});

router.get("/", (req, res) => {
  res.send("dentro de user route");
});

router.post("/prueba", (req, res) => {
  res.send(req.body);
});

module.exports = router;
