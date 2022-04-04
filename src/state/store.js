import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import usersReducer from "./user";
import userLeaguesReducer from "./userLeague";
import leaguesReducer from "./league";
import selectLeaguesReducer from "./selectLeague";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: usersReducer,
    userLeagues: userLeaguesReducer,
    leagues: leaguesReducer,
    selectLeague: selectLeaguesReducer,
  },
});

export default store;
