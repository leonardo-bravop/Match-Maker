const Result = require('../models/Result');


exports.createResult = (req, res) => {
    const { score1, score2} = req.body;
    Result.create({
        score_1: score1, 
        score_2: score2, 
        confirmation_1: false,
        confirmation_2: false
    }
    ).then((data) => {
      res.send(data)
    })
  };
  
  exports.confirmateResultTeam = (req, res) => {
    const { id, team } = req.params;
    if (team === 1){
      Result.updateOne(
        {confirmation_1: true},
        { where: id})
        .then((data) => {
          res.send(data)
        })
    }
    else if (team === 2)
    {
      Result.updateOne(
        {confirmation_2: true},
        { where: id})
        .then((data) => {
          res.send(data)
        })
    }
  };

  
  