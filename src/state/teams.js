import { createAction, createReducer } from "@reduxjs/toolkit"

export const setTeam = createAction( "ADDTEAM" )
export const removeTeam = createAction( "DELTEAM" )
export const resetTeams = createAction( "RESET" )

const initial = { "teamA": [], "teamB": [] }

export const teamsReducer = createReducer( initial, { 
   [ setTeam ]: ( state, action ) => {
         const {team, id} = action.payload
         state[team] = [...state[team], id]
         return state
      },
   [ removeTeam ]: ( state, action ) => {
         const {team, id} = action.payload
         state[team] = [...state[team]].filter( itemId => itemId !== id)
         return state
      },
   [ resetTeams ]: ( state, action ) => initial
} )