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
  
  exports.confirmateResultTeam1 = (req, res) => {
    const { resultId } = req.params;
    Result.updateOne(
    {confirmation_1: true},
    { where: resultId})
    .then((data) => {
      res.send(data)
    })
  };

  exports.confirmateResultTeam2 = (req, res) => {
    const { resultId } = req.params;
    Result.updateOne(
    {confirmation_2: true},
    { where: resultId})
    .then((data) => {
      res.send(data)
    })
  };
  
  