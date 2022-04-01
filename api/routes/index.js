const express = require("express");
const router = express.Router()
const user = require("./user")
const league = require("./league")
const match = require("./match")
const invitation = require("./invitation")

router.use("/user", user)
router.use("/league", league)
router.use("/match", match)
router.use("/invitation", invitation)

module.exports = router