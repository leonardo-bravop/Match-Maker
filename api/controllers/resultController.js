const Result = require("../models/Result");
const Match = require("../models/Match");
const User = require("../models/Users");
const Elo = require("../models/Elo");

//cuando uno de un equipo updatea el result, confirmation pasa a true
//match status sigue en completada
//cuando el otro pone un result diferente
//match status pasa a conflicto
//confirmation pasa a false
//en el front aparece el input de resultado otra vez
//caso 1: uno de los dos pone un resultado diferente, pero siguen  conflicto
//confirmation de los 2 equipos sigue en false, match status sigue en conflicto
//caso 2: uno de los pone el mismo resultado que el otro
//si son iguales match.status cambia a confirmado, confirmation 1 y 2 pasan a true

exports.updateResult = (req, res, next) => {
  const { score } = req.body;
  const { matchId, userId } = req.params;
  let matchRef, team, resultRef;
  let eloTeam1 = 0;
  let eloTeam2 = 0;
  let score1, score2;
  let eloDiff;
  Match.findById(matchId)
    .then((match) => {
      if (match) {
        if (match.team_1.indexOf(userId) !== -1) team = 1;
        else if (match.team_2.indexOf(userId) !== -1) team = 2;
        matchRef = match;
        if (
          match.status === "lista" ||
          match.status === "completada" ||
          match.status === "conflicto" ||
          match.status === "confirmada" //SACAR ESTE ULTIMO OR
        ) {
          return Result.findById(match.result.toString());
        } else if (match.status === "pendiente") {
          res.status(400);
          next(new Error("Can't update result of a pending match"));
        }
      } else {
        res.status(400);
        next(new Error("Match not found"));
      }
    })
    .then((result) => {
      if (result) {
        resultRef = result;
        return updateResultConfirmation(result, matchRef, userId, team, score);
      }
    })
    .then((updatedResult) => {
      if (updatedResult) return updateMatchStatus(updatedResult, matchRef);
    })
    .then((updatedMatch) => {
      if (updatedMatch) {
        matchRef = updatedMatch;
        if (updatedMatch.status === "confirmada") {
          let arrScore = resultRef.score_1.split("-");
          score1 = arrScore[0];
          score2 = arrScore[1];
          return sumElo(1, eloTeam1, matchRef);
        }
      }
    })
    .then((sumelo1) => {
      if (sumelo1) {
        eloTeam1 = Math.max(...sumelo1);
        return sumElo(2, eloTeam2, matchRef);
      }
    })
    .then((sumelo2) => {
      if (sumelo2) {
        eloTeam2 = Math.max(...sumelo2);
        eloDiff = calculateEloDiff(eloTeam1, eloTeam2, score1, score2);
        return updateEloWithDiff(matchRef, 1, eloDiff);
      }
    })
    .then((result) => {
      if (result) {
        return updateEloWithDiff(matchRef, 2, eloDiff);
      }
    })
    .then(() => {
      res.send(matchRef);
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

const updateEloWithDiff = (match, team, eloDiff) => {
  let operador = team === 1 ? 1 : -1;
  return Promise.all(
    match[`team_${team}`].map((userId) => {
      Elo.findOne({
        user: userId,
        league: match.league,
      }).then((elo) => {
        elo.value = elo.value + operador * eloDiff;
        return elo.save();
      });
    })
  );
};

const calculateEloDiff = (eloTeam1, eloTeam2, score1, score2) => {
  let probabilidadTeam1 = 1 / (1 + 10 ** ((eloTeam2 - eloTeam1) / 400));
  let eloDiff;
  if (score1 > score2) {
    eloDiff = Math.ceil(15 * (1 - probabilidadTeam1));
  } else if (score2 > score1) {
    eloDiff = Math.ceil(15 * (0 - probabilidadTeam1));
  } else {
    eloDiff = 15 * (0.5 - probabilidadTeam1);
    eloDiff < 0
      ? (eloDiff = -1 * Math.ceil(Math.abs(eloDiff)))
      : (eloDiff = Math.ceil(eloDiff));
  }
  return eloDiff;
};

const sumElo = (n, eloTeam_n, match) => {
  return Promise.all(
    match[`team_${n}`].map((element) => {
      return User.findById(element).then((user) => {
        return Elo.findOne({
          user: user._id,
          league: match.league.toString(),
        }).then((elo) => {
          return (eloTeam_n += elo.value / match[`team_${n}`].length);
        });
      });
    })
  );
};

const updateResultConfirmation = (result, match, userId, team, score) => {
  let confirmation;
  if (match.team_1.indexOf(userId) !== -1) team = 1;
  else if (match.team_2.indexOf(userId) !== -1) team = 2;
  confirmation = `confirmation_${team}`;
  result[confirmation] = true;
  console.log(`result es`, result);
  result[`score_${team}`] = score;
  if (result.score_1 && result.score_2 && result.score_1 === result.score_2) {
    console.log(`entre al primer if`);
    result["confirmation_1"] = true;
    result["confirmation_2"] = true;
  }
  // else if (result.score_1 && !result.score_2) {
  //   result["confirmation_1"] = true;
  // } else if (!result.score_1 && result.score_2) {
  //   result["confirmation_2"] = true;
  // }
  else if (
    result["confirmation_1"] &&
    result["confirmation_2"] &&
    result.score_1 !== result.score_2
  ) {
    console.log(`entre al else if`);
    result["confirmation_1"] = false;
    result["confirmation_2"] = false;
  }
  return result.save();
};

const updateMatchStatus = (updatedResult, match) => {
  let equalResults =
    updatedResult.score_1 &&
    updatedResult.score_2 &&
    updatedResult.score_1 === updatedResult.score_2;
  let matchStatus;
  if (updatedResult) {
    if (match.status === "lista") {
      matchStatus = "completada"; // SACAR EL ULTIMO MATCH STATUS ==== CONFIRMADA
    } else if (
      match.status === "completada" ||
      match.status === "conflicto" ||
      match.status === "confirmada"
    ) {
      equalResults ? (matchStatus = "confirmada") : (matchStatus = "conflicto");
    }
    if (matchStatus) {
      return Match.findByIdAndUpdate(
        match._id.toString(),
        { status: matchStatus },
        { new: true }
      );
    }
  }
};

exports.getResultByMatchId = (req, res, next) => {
  const { matchId } = req.params;
  Match.findById(matchId)
    .then((match) => {
      return Result.findById(match.result.toString());
    })
    .then((result) => res.send(result))
    .catch((error) => {
      res.status(400);
      next(new Error(error));
    });
};

// exports.confirmResultTeam = (req, res, next) => {
//   const { resultId, team, matchId } = req.params;
//   let scorefinal;
//   let result1;
//   let result2;
//   if (team === "1" || team === "2") {
//     // Match.findById(matchId).then(match=>{
//     //   if(match.status==="completada")
//     // })

//     if (match.status === "confirmada") {
//       let eloTeam1 = 0;
//       let eloTeam2 = 0;
//       scorefinal = Math.abs(result.score_1 - result.score_2);
//     }

//     // para match.team_1 y match.team_2
//     Promise.all(
//       match.team_1.map((element) => {
//         return User.findById(element).then((user) => {
//           return Elo.findOne({
//             user: user._id,
//             league: match.league.toString(),
//           }).then((elo) => {
//             eloTeam1 += elo.value / match.team_1.length;
//             console.log("updateando elo");
//             console.log("elo team 1", eloTeam1);
//           });
//         });
//       })
//     ).then(() => {
//       let probabilidadTeam1 = 1 / (1 + 10 ** ((eloTeam2 - eloTeam1) / 400));
//       let eloDiff;
//       let operador;
//       if (result.score_1 > result.score_2) {
//         operador = 1;
//         eloDiff = Math.ceil(15 * (1 - probabilidadTeam1));
//       } else if (result.score_2 > result.score_1) {
//         operador = 1;
//         eloDiff = Math.ceil(15 * (0 - probabilidadTeam1));
//       } else {
//         operador = 1;
//         eloDiff = 15 * (0.5 - probabilidadTeam1);
//         eloDiff < 0
//           ? (eloDiff = -1 * Math.ceil(Math.abs(eloDiff)))
//           : (eloDiff = Math.ceil(eloDiff));
//       }

//       const promisesArray = match.team_1.map((userId) => {
//         Elo.findOne({
//           user: userId,
//           league: match.league,
//         }).then((elo) => {
//           elo.value = elo.value + operador * eloDiff;
//           return elo.save();
//         });
//       });
//       promisesArray.concat(
//         match.team_2.map((userId) => {
//           Elo.findOne({
//             user: userId,
//             league: match.league,
//           }).then((elo) => {
//             elo.value = elo.value - operador * eloDiff;
//             return elo.save();
//           });
//         })
//       );
//       return Promise.all(promisesArray);
//     });

//     ////==========================================================================================================
//     Result.findById(resultId)
//       .populate("match")
//       .then((result) => {
//         result[`confirmation_${team}`] = true;
//         result.save().then((updatedResult) => {
//           if (updatedResult.confirmation_1 && updatedResult.confirmation_2) {
//             Match.findById(matchId).then((match) => {
//               match.status = "confirmed";
//               let eloTeam1 = 0;
//               let eloTeam2 = 0;
//               scorefinal = Math.abs(result.score_1 - result.score_2);
//               console.log(`match equipo 1 es`, match.team_1);
//               Promise.all(
//                 match.team_1.map((element) => {
//                   return User.findById(element).then((user) => {
//                     return Elo.findOne({
//                       user: user._id,
//                       league: match.league.toString(),
//                     }).then((elo) => {
//                       eloTeam1 += elo.value / match.team_1.length;
//                       console.log("updateando elo");
//                       console.log("elo team 1", eloTeam1);
//                     });
//                   });
//                 })
//               ).then(() => {
//                 Promise.all(
//                   match.team_2.map((element) => {
//                     return User.findById(element).then((user) => {
//                       // console.log(`user es`, user);
//                       // console.log(`match es`, match);
//                       return Elo.findOne({
//                         user: user._id,
//                         league: match.league.toString(),
//                       }).then((elo) => {
//                         eloTeam2 += elo.value / match.team_2.length;
//                         console.log("updateando elo");
//                         console.log("elo team 2", eloTeam2);
//                       });
//                     });
//                   })
//                 )
//                   .then(() => {
//                     let probabilidadTeam1 =
//                       1 / (1 + 10 ** ((eloTeam2 - eloTeam1) / 400));
//                     let probabilidadTeam2 =
//                       1 / (1 + 10 ** ((eloTeam1 - eloTeam2) / 400));
//                     console.log("Proabilidad team 1", probabilidadTeam1);
//                     console.log("Proabilidad team 2", probabilidadTeam2);
//                     console.log("elo team 1", eloTeam1);
//                     console.log("elo team 2", eloTeam2);
//                     let eloDiff;
//                     let operador;
//                     console.log(`scorefinal es`, scorefinal);
//                     // console.log(`match es`, match);
//                     // console.log(`result es`, result);
//                     if (result.score_1 > result.score_2) {
//                       operador = 1;
//                       // eloDiff = 5 * (scorefinal - probabilidadTeam1);
//                       eloDiff = Math.ceil(15 * (1 - probabilidadTeam1));
//                     } else if (result.score_2 > result.score_1) {
//                       // operador = -1
//                       operador = 1;
//                       // eloDiff = 5 * (scorefinal - probabilidadTeam2);
//                       eloDiff = Math.ceil(15 * (0 - probabilidadTeam1));
//                     } else {
//                       operador = 1;
//                       //definir la probabilidad de quien
//                       // (probabilidadTeam1 > probabilidadTeam2) ? operador = 1 : operador = -1
//                       // eloDiff = 5 * (0.5 - Math.max(probabilidadTeam1, probabilidadTeam2));
//                       // eloDiff = 15 * (0.5 - probabilidadTeam1);
//                       console.log(`elodiff es`, eloDiff);
//                       eloDiff = 15 * (0.5 - probabilidadTeam1);
//                       console.log(`elodiff es`, eloDiff);
//                       eloDiff < 0
//                         ? (eloDiff = -1 * Math.ceil(Math.abs(eloDiff)))
//                         : (eloDiff = Math.ceil(eloDiff));
//                     }
//                     console.log(`AHORA elodiff es`, eloDiff);

//                     const promisesArray = match.team_1.map((userId) => {
//                       Elo.findOne({
//                         user: userId,
//                         league: match.league,
//                       }).then((elo) => {
//                         elo.value = elo.value + operador * eloDiff;
//                         console.log(`elo essssss`, elo);
//                         return elo.save();
//                       });
//                     });
//                     promisesArray.concat(
//                       match.team_2.map((userId) => {
//                         Elo.findOne({
//                           user: userId,
//                           league: match.league,
//                         }).then((elo) => {
//                           // elo.value = elo.value - (operador)*eloDiff;
//                           elo.value = elo.value - operador * eloDiff;
//                           console.log(`elo essssss`, elo);
//                           return elo.save();
//                         });
//                       })
//                     );
//                     return Promise.all(promisesArray);
//                     //si son empate elodiff que seria?
//                   })
//                   .then(() => {
//                     res.send(updatedResult);
//                   });
//               });

//               // match.team_1.forEach((element) => {
//               //   console.log(`entrando al foreach de equipo1`)
//               //   User.findById(element).then((user) => {
//               //     console.log(`entrando al then del user luego de user findby id`)
//               //     Elo.findOne({ user: user._id, league: match.league }).then(
//               //       (elo) => {
//               //         eloTeam1 += elo;
//               //         console.log("updateando elo")
//               //       }
//               //     );
//               //   });
//               // });
//               // match.team_2.forEach((element) => {
//               //   User.findById(element).then((user) => {
//               //     Elo.findOne({ user: user._id, league: match.league }).then(
//               //       (elo) => {
//               //         eloTeam2 += elo;
//               //       }
//               //     );
//               //   });
//               // });
//             });
//           } else {
//             res.send(updatedResult);
//           }
//         });
//       });
//   } else {
//     res.status(400);
//     next(new Error("Enter a valid team number"));
//   }
// };

// /*score final  = score 1 - score 2
//                       5 - 3

//         elo + (cuanto afecta *(scorefinal - probabilidad de ganar))
//         800 +        5       *(   11      -   0,5 )

// eloDif = 800 + (probabilidad (score + cuantoafecta))

// elo caracte 1 += eloDif

// elo caracter 2 -= eloDif

// 800 805 701 500 = 2806/4 = 701,5

// 900 1000 500 300 = 2700/4 = 675

// 1/ (1+10^(elo2 - elo1)/400)*/
