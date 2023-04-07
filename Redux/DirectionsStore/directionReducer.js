import { SET_ORIGIN, SET_DESTINATION } from "./actions"

const initialState = {
	origin: "Origin",
	destination: "Destination",
}

function directionsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ORIGIN:
			return { ...state, origin: action.payload }
		case SET_DESTINATION:
			return { ...state, destination: action.payload }
		default:
			return state
	}
}
export default directionsReducer
