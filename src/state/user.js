import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

export const setUserMe = createAsyncThunk("ME", (userString) => {
    return axios.post(`${uri}/api/user/me`,{},{headers: {Authorization: `Bearer ${userString}`,},}).then((res) => res.data);
});

export const initialState = {};

export const usersReducer = createReducer(initialState, {
    [setUserMe.fulfilled]: (state, action) => action.payload,
})