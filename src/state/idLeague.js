import { createAction, createReducer } from "@reduxjs/toolkit"

export const setLeagueId = createAction( "SETLEAGUEID" )

export const leagueIdReducer = createReducer( "", { 
   [ setLeagueId ]: ( state, action ) => {
      console.log("En el reducer de set league id");
      console.log("action payload es", action.payload);
      return action.payload}
} )   