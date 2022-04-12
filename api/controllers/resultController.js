const Result = require("../models/Result");
const Match = require("../models/Match");
const User = require("../models/Users");
const Elo = require("../models/Elo");

exports.updateResult = (req, res, next) => {
  const { score } = req.body;
  const { resultId, matchId, userId } = req.params;
  let matchRef, team, equalResults, matchStatus;
  Match.findById(matchId)
    .then((match) => {
      if (match) {
        matchRef = match;
        if (
          match.status === "lista" ||
          match.status === "completada" ||
          match.status === "conflicto"
        ) {
          return Result.findById(resultId);
        }
      }
    })
    .then((result) => {
      if (result) {
        if (matchRef.team_1.indexOf(userId) !== -1) team = 1;
        else if (matchRef.team_2.indexOf(userId) !== -1) team = 2;
        result[`score_${team}`] = score;
        if (result.score_1 === result.score_2) equalResults = true;
        return result.save();
      }
    })
    .then((updatedResult) => {
      if (updatedResult) {
        if (matchRef.status === "lista") {
          matchStatus = "completada";
        } else if (
          matchRef.status === "completada" ||
          matchRef.status === "conflicto"
        ) {
          equalResults
            ? (matchStatus = "confirmada")
            : (matchStatus = "conflicto");
        }
        if (matchStatus) {
          return Match.findByIdAndUpdate(
            matchId,
            { status: matchStatus },
            { new: true }
          );
        }
      }
    })
    .then((updatedMatch) => {
      if (updatedMatch) {
        res.send(updatedMatch);
      } else {
        res.status(400);
        next(new Error("Match not found"));
      }
    })
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};
//entrar a update result desde el id del match

//solo se puede confirmar si match status es "completada"
//recibir result 1 desde equipo 1 como string "3-1"
//comparar result2 con result1

exports.confirmResultTeam = (req, res, next) => {
  const { resultId, team, matchId } = req.params;
  let scorefinal;
  let result1;
  let result2;
  if (team === "1" || team === "2") {
    // Match.findById(matchId).then(match=>{
    //   if(match.status==="completada")
    // })

    Result.findById(resultId)
      .populate("match")
      .then((result) => {
        // console.log(`result essssssssssss`, result)
        result[`confirmation_${team}`] = true;
        result.save().then((updatedResult) => {
          if (updatedResult.confirmation_1 && updatedResult.confirmation_2) {
            Match.findById(matchId).then((match) => {
              match.status = "confirmed";
              let eloTeam1 = 0;
              let eloTeam2 = 0;
              scorefinal = Math.abs(result.score_1 - result.score_2);
              console.log(`match equipo 1 es`, match.team_1);
              Promise.all(
                match.team_1.map((element) => {
                  return User.findById(element).then((user) => {
                    // console.log(`user es`, user);
                    // console.log(`match es`, match);
                    return Elo.findOne({
                      user: user._id,
                      league: match.league.toString(),
                    }).then((elo) => {
                      eloTeam1 += elo.value / match.team_1.length;
                      console.log("updateando elo");
                      console.log("elo team 1", eloTeam1);
                    });
                  });
                })
              ).then(() => {
                Promise.all(
                  match.team_2.map((element) => {
                    return User.findById(element).then((user) => {
                      // console.log(`user es`, user);
                      // console.log(`match es`, match);
                      return Elo.findOne({
                        user: user._id,
                        league: match.league.toString(),
                      }).then((elo) => {
                        eloTeam2 += elo.value / match.team_2.length;
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
                    let operador;
                    console.log(`scorefinal es`, scorefinal);
                    // console.log(`match es`, match);
                    // console.log(`result es`, result);
                    if (result.score_1 > result.score_2) {
                      operador = 1;
                      // eloDiff = 5 * (scorefinal - probabilidadTeam1);
                      eloDiff = Math.ceil(15 * (1 - probabilidadTeam1));
                    } else if (result.score_2 > result.score_1) {
                      // operador = -1
                      operador = 1;
                      // eloDiff = 5 * (scorefinal - probabilidadTeam2);
                      eloDiff = Math.ceil(15 * (0 - probabilidadTeam1));
                    } else {
                      operador = 1;
                      //definir la probabilidad de quien
                      // (probabilidadTeam1 > probabilidadTeam2) ? operador = 1 : operador = -1
                      // eloDiff = 5 * (0.5 - Math.max(probabilidadTeam1, probabilidadTeam2));
                      // eloDiff = 15 * (0.5 - probabilidadTeam1);
                      console.log(`elodiff es`, eloDiff);
                      eloDiff = 15 * (0.5 - probabilidadTeam1);
                      console.log(`elodiff es`, eloDiff);
                      eloDiff < 0
                        ? (eloDiff = -1 * Math.ceil(Math.abs(eloDiff)))
                        : (eloDiff = Math.ceil(eloDiff));
                    }
                    console.log(`AHORA elodiff es`, eloDiff);

                    const promisesArray = match.team_1.map((userId) => {
                      Elo.findOne({
                        user: userId,
                        league: match.league,
                      }).then((elo) => {
                        elo.value = elo.value + operador * eloDiff;
                        console.log(`elo essssss`, elo);
                        return elo.save();
                      });
                    });
                    promisesArray.concat(
                      match.team_2.map((userId) => {
                        Elo.findOne({
                          user: userId,
                          league: match.league,
                        }).then((elo) => {
                          // elo.value = elo.value - (operador)*eloDiff;
                          elo.value = elo.value - operador * eloDiff;
                          console.log(`elo essssss`, elo);
                          return elo.save();
                        });
                      })
                    );
                    return Promise.all(promisesArray);
                    //si son empate elodiff que seria?
                  })
                  .then(() => {
                    res.send(updatedResult);
                  });
              });

              // match.team_1.forEach((element) => {
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
              // match.team_2.forEach((element) => {
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
    res.status(400);
    next(new Error("Enter a valid team number"));
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
