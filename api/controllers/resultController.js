const Result = require("../models/Result");
const Match = require("../models/Match");
const User = require("../models/Users")
const Elo = require("../models/Elo")

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
  const { resultId, team, matchId } = req.params;
  if (team === "1" || team === "2") {
    Result.findById(resultId).then((result) => {
      result[`confirmation_${team}`] = true;
      result.save().then((updatedResult) => {
      if(updatedResult.confirmation_1 && updatedResult.confirmation_2 )
      {
        Match.findById(matchId)
        .then((match) => {
        console.log(match)
        let eloTeam1 = 0;
        let eloTeam2 = 0;
        let scorefinal;
        if (match.score_1 > match.score_2)
        {
          scorefinal = match.score_1 - match.score_2
        }
        else{
          scorefinal = match.score_2 - match.score_1
        }
        match.equipo_1.forEach(element => {
          User.findById(element)
          .then((user) => {
            Elo.findOne({user: user._id, league: match.league})
            .then((elo) => {
              eloTeam1 += elo
            })
          })
        });
        match.equipo_2.forEach(element => {
          User.findById(element)
          .then((user) => {
            Elo.findOne({user: user._id, league: match.league})
            .then((elo) => {
              eloTeam2 += elo
            })
          })
        });
        let probabilidadTeam1 = 1/(1+10**(eloTeam2 - eloTeam1)/400)
        let probabilidadTeam2 = 1/(1+10**(eloTeam1 - eloTeam2)/400)
        console.log("Proabilidad team 1",probabilidadTeam1)
        console.log("Proabilidad team 2",probabilidadTeam2)
        console.log("Score team 1",eloTeam1)
        console.log("Score team 2",eloTeam2)

        res.send(updatedResult)});
      }
        })
    });
  } else {
    res.send("Enter a valid team number").status(400);
  }
};

/*score final  = score 1 - score 2
                      5 - 3


        elo + (cuanto afecta *(scorefinal - probabilidad de ganar))
        800 +        5       *(    2      -   0,5 )

eloDif = 800 + (probabilidad (score + cuantoafecta))

elo caracte 1 += eloDif

elo caracter 2 -= eloDif

800 805 701 500 = 2806/4 = 701,5 

900 1000 500 300 = 2700/4 = 675

1/ (1+10^(elo2 - elo1)/400)*/