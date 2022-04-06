import { createStore, combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import {usersReducer} from "./user";
import {teamsReducer} from "./teams";
import { checksReducer } from './checks';

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      user: usersReducer,
      teams: teamsReducer,
      checks: checksReducer,
    },
  });
  
  export default store;