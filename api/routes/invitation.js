const express = require("express");
const router = express.Router();
const invitationsController = require("../controllers/invitationsController")

router.delete("/deleteAll", invitationsController.deleteAll)

module.exports = router;