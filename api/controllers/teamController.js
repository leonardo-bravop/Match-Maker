const Team = require('../models/Team')
const User = require("../models/Users");


exports.newTeam = (req, res) => {
    const { name, matches, users } = req.body;
    Team.create({
      name: name,
      matches: matches, 
      users: users
    }
    ).then((data) => {
      res.send(data)
    })
  };
  exports.deleteTeam = (req, res) => {
    const { id } = req.params;
    Team.deleteOne({ where: id}
    ).then((data) => {
      res.send(data)
    })
  };
  
  exports.changeNameTeam = (req, res) => {
    const { id } = req.params;
    const {name, users } = req.body
    Team.updateOne(
      { name: name,
        users: users},
      { where: id})
      .then((data) => {
        res.send(data)
      })
  }
  exports.changeUserInTeam = (req, res) => {
  
  };