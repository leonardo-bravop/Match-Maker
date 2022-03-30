const Match = require('../models/Match')
const User = require("../models/Users");

exports.newMatch = (req, res) => {
    const { league, equipo_1, equipo_2, fecha, resultado} = req.body;
    Match.create({
        league: league,
        equipo_1: equipo_1,
        equipo_2: equipo_2,
        Fecha: fecha,
        Resultado: resultado
    }
    ).then((data) => {
      res.send(data)
    })
  };
  exports.deleteMatch = (req, res) => {
    const { id } = req.params;
    Match.deleteOne({ where: id}
    ).then((data) => {
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