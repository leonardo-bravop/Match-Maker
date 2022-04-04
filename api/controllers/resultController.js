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

exports.confirmResultTeam = (req, res) => {
  const { resultId, team } = req.params;
  if (team === "1" || team === 2) {
    Result.findById(resultId).then((result) => {
      result[`confirmation_${team}`] = true;
      result.save().then((updatedResult) => res.send(updatedResult));
    });
  } else {
    res.send("Enter a valid team number").status(400);
  }
};
