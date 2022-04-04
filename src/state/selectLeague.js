import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

export const setLeague = createAsyncThunk("_LEAGUE", (league) => league);

export const addUserToLeague = createAsyncThunk("ADD_USER_TO_LEAGUE", ({ligueId, userData}) => {
    console.log('LIGUE ====> ', ligueId)
  return axios
    .put(`${uri}/api/league/addUser/${ligueId}`, {
      userId: userData.id,
    })
    .then((res) => res.data);
});

const initialState = {};

const selectLeaguesReducer = createReducer(initialState, {
  [setLeague.fulfilled]: (state, action) => action.payload,
  [addUserToLeague.fulfilled]: (state, action) => [...state, action.payload],
});

export default selectLeaguesReducer;
