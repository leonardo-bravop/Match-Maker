const Match = require('../models/Match')
const User = require("../models/Users");
const Invitation = require("../models/Invitation")

exports.newMatch = (req, res) => {
    const { equipo_1, equipo_2, fecha} = req.body;
    console.log(`req body es`, req.body)
    Match.create({
        equipo_1: equipo_1,
        equipo_2: equipo_2,
        Fecha: fecha,
    }
    ).then(() => {
      const equipos = equipo_1.concat(equipo_2)
      console.log(`equipos es`, equipos)
      const promisesArray = []
      Promise.all(equipos.foreach(user=>{
       Invitation.create({status: 'pending'}).then(invitation=>{
         console.log(`user id es`, user._id)
         Invitation.findByIdAndUpdate(invitation_id, { $push: { users: userId } },
          { new: true, useFindAndModify: false })
        //  Invitation.updateOne()
       })
      })).then(result=>res.send(result))
    })
  };

  exports.deleteMatch = (req, res) => {
    const { id } = req.params;
    Match.deleteOne({ where: id}
    ).then((data) => {
      res.send(data)
    })
  };

  exports.deleteAll = (req, res) => {
    Match.deleteMany().then((data) => {
      res.send(data)
    })
  };

  exports.findMatch = (req, res) => {
    const { id } = req.params;
    Match.findById({ where: id}
    ).then((data) => {
      res.send(data)
    })
  };