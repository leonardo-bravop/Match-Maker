const Result = require("../models/Result");
const Match = require("../models/Match");
const User = require("../models/Users");
const Elo = require("../models/Elo");

exports.updateResult = (req, res) => {
  const { score_1, score_2 } = req.body;
  const { resultId } = req.params;
  Result.findById(resultId).then((result) => {
    result.score_1 = score_1;
    result.score_2 = score_2;
    result.save().then((updatedResult) => res.send(updatedResult));
  });
};
//entrar a update result desde el id del match

exports.confirmResultTeam = (req, res) => {
  const { resultId, team, matchId } = req.params;
  let scorefinal;
  let result1;
  let result2
  if (team === "1" || team === "2") {
    Result.findById(resultId).populate("match").then((result) => {
      console.log(`result essssssssssss`, result)
      result[`confirmation_${team}`] = true;
      result.save().then((updatedResult) => {
        if (updatedResult.confirmation_1 && updatedResult.confirmation_2) {
          Match.findById(matchId).then((match) => {
            match.status = "confirmed";
            let eloTeam1 = 0;
            let eloTeam2 = 0;
            scorefinal = Math.abs(result.score_1 - result.score_2);
            console.log(`match equipo 1 es`, match.equipo_1);
            Promise.all(
              match.equipo_1.map((element) => {
                return User.findById(element).then((user) => {
                  console.log(`user es`, user);
                  console.log(`match es`, match);
                  return Elo.findOne({
                    user: user._id,
                    league: match.league.toString(),
                  }).then((elo) => {
                    eloTeam1 += elo.value/(match.equipo_1.length);
                    console.log("updateando elo");
                    console.log("elo team 1", eloTeam1);
                  });
                });
              })
            ).then(() => {
              Promise.all(
                match.equipo_2.map((element) => {
                  return User.findById(element).then((user) => {
                    console.log(`user es`, user);
                    console.log(`match es`, match);
                    return Elo.findOne({
                      user: user._id,
                      league: match.league.toString(),
                    }).then((elo) => {
                      eloTeam2 += elo.value/(match.equipo_2.length);
                      console.log("updateando elo");
                      console.log("elo team 2", eloTeam2);
                    });
                  });
                })
              )
                .then(() => {
                  let probabilidadTeam1 =
                    1 / (1 + 10 ** ((eloTeam2 - eloTeam1) / 400));
                  let probabilidadTeam2 =
                    1 / (1 + 10 ** ((eloTeam1 - eloTeam2) / 400));
                  console.log("Proabilidad team 1", probabilidadTeam1);
                  console.log("Proabilidad team 2", probabilidadTeam2);
                  console.log("elo team 1", eloTeam1);
                  console.log("elo team 2", eloTeam2);
                  let eloDiff;
                  let eloDiff2;
                  let operador
                  console.log(`scorefinal es`, scorefinal);
                  console.log(`match es`, match);
                  console.log(`result es`, result);
                  if (result.score_1 > result.score_2) {
                    operador = 1
                    // eloDiff = 5 * (scorefinal - probabilidadTeam1);
                    eloDiff = 15 * (1 - probabilidadTeam1);
                  } else if (result.score_2 > result.score_1) {
                    // operador = -1
                    operador = 1
                    // eloDiff = 5 * (scorefinal - probabilidadTeam2);
                    eloDiff = 15 * (0 - probabilidadTeam1);
                  } else { //definir la probabilidad de quien
                    operador = 1
                    // (probabilidadTeam1 > probabilidadTeam2) ? operador = 1 : operador = -1
                    // eloDiff = 5 * (0.5 - Math.max(probabilidadTeam1, probabilidadTeam2));
                    eloDiff = 15 * (0.5 - probabilidadTeam1);
                  }

                  const promisesArray = match.equipo_1.map((userId) => {
                    Elo.findOne({
                      user: userId,
                      league: match.league,
                    }).then((elo) => {
                      elo.value = elo.value + Math.round((operador)*eloDiff);
                      console.log(`elo essssss`, elo);
                      return elo.save()
                    });
                  })
                  promisesArray.concat(match.equipo_2.map((userId) => {
                    Elo.findOne({
                      user: userId,
                      league: match.league,
                    }).then((elo) => {
                      // elo.value = elo.value - (operador)*eloDiff;
                      elo.value = elo.value - Math.round((operador)*eloDiff);
                      console.log(`elo essssss`, elo);
                      return elo.save()
                    });
                  }))
                  return Promise.all(
                    promisesArray
                  );
                  //si son empate elodiff que seria?
                })
                .then((promises) => {
                  console.log(promises);
                  res.send(updatedResult);
                });
            });

            // match.equipo_1.forEach((element) => {
            //   console.log(`entrando al foreach de equipo1`)
            //   User.findById(element).then((user) => {
            //     console.log(`entrando al then del user luego de user findby id`)
            //     Elo.findOne({ user: user._id, league: match.league }).then(
            //       (elo) => {
            //         eloTeam1 += elo;
            //         console.log("updateando elo")
            //       }
            //     );
            //   });
            // });
            // match.equipo_2.forEach((element) => {
            //   User.findById(element).then((user) => {
            //     Elo.findOne({ user: user._id, league: match.league }).then(
            //       (elo) => {
            //         eloTeam2 += elo;
            //       }
            //     );
            //   });
            // });
          });
        } else {
          res.send(updatedResult);
        }
      });
    });
  } else {
    res.send("Enter a valid team number").status(400);
  }
};

/*score final  = score 1 - score 2
                      5 - 3


        elo + (cuanto afecta *(scorefinal - probabilidad de ganar))
        800 +        5       *(   11      -   0,5 )

eloDif = 800 + (probabilidad (score + cuantoafecta))

elo caracte 1 += eloDif

elo caracter 2 -= eloDif

800 805 701 500 = 2806/4 = 701,5 

900 1000 500 300 = 2700/4 = 675

1/ (1+10^(elo2 - elo1)/400)*/
