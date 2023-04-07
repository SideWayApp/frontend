import { configureStore, combineReducers } from "@reduxjs/toolkit"
import directionsReducer from "./DirectionsStore/directionReducer"

const rootReducer = combineReducers({
	directions: directionsReducer,
})

const store = configureStore({
	reducer: rootReducer,
})

export default store
