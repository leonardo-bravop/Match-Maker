const express = require("express")
const router = express.Router()
const userSchema = require("../models/Users")

router.post("/", (req, res)=>{
    console.log(`el req body es`, req.body)
    const user = userSchema(req.body)
    user.save().then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.json({message: error})
    })
})

module.exports = router