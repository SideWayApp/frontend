import { configureStore, combineReducers } from "@reduxjs/toolkit";
import directionsReducer from "./DirectionsStore/directionReducer";
import authReducer from "./authenticationReducer/ authReducer";

const rootReducer = combineReducers({
  directions: directionsReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
