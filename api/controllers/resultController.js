const Result = require("../models/Result");

exports.updateResult = (req, res) => {
  const { score_1, score_2 } = req.body;
  const { resultId } = req.params;
  Result.findById(resultId).then((result) => {
    result.score_1 = score_1;
    result.score_2 = score_2;
    result.save().then((updatedResult) => res.send(updatedResult));
  });
};

exports.confirmateResultTeam = (req, res) => {
  const { id, team } = req.params;
  if (team === 1) {
    Result.updateOne({ confirmation_1: true }, { where: id }).then((data) => {
      res.send(data);
    });
  } else if (team === 2) {
    Result.updateOne({ confirmation_2: true }, { where: id }).then((data) => {
      res.send(data);
    });
  }
};
