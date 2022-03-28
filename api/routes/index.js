const express = require("express");
const router = express.Router()
const user = require("./user")
const league = require("./league")

router.use("/user", user)
router.use("/league", league)


module.exports = router