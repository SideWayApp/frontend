import { configureStore, combineReducers } from "@reduxjs/toolkit"
import directionsReducer from "./DirectionsStore/directionReducer"
import authReducer from "./authenticationReducer/ authReducer"
import IsWalkingReducer from "./IsWalkingStore/IsWalkingReducer"

const rootReducer = combineReducers({
	directions: directionsReducer,
	auth: authReducer,
	isWalking: IsWalkingReducer,
})

const store = configureStore({
	reducer: rootReducer,
})

export default store
