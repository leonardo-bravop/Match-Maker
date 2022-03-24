const express = require("express")
const router = express.Router()
const userSchema = require("../models/Users")
var jwt = require('jsonwebtoken');

router.post("/singin", (req, res)=>{
    console.log(`el req body es`, req.body)
    const user = userSchema(req.body)
    user.save().then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.json({message: error})
    })
})

router.post("/login", (req,res) =>{
    const user = req.body
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
})

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken
        next(); 
    }
    else 
    {
        res.sendStatus(403);
    }
}

router.post("/check", verifyToken ,(req,res) =>{
    jwt.verify(req.token,'secretkey', (err, authData)=> {
        if(err)
        {
            res.sendStatus(403);
        }
        else{
            res.json({
                mensaje: 'token fue creado',
                authData: authData
            })
        }
    })
})

router.get("/" ,(req,res)=>{
    res.send("dentro de user route")
})

router.post("/prueba" ,(req,res)=>{

    res.send(req.body)
})


module.exports = router