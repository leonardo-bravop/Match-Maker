const express = require("express");
const router = express.Router()
const user = require("./user")
const league = require("./league")
const match = require("./match")
const invitation = require("./invitation")
//const history = require("./history")
//const team = require("./team")
const result = require("./result")

router.use("/user", user)
router.use("/league", league)
router.use("/match", match)
router.use("/invitation", invitation)
//router.use("/history", history)
//router.use("/team", team)
router.use("/result", result)



module.exports = router