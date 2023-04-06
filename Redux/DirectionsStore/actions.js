export const SET_ORIGIN = "SET_ORIGIN"
export const SET_DESTINATION = "SET_DESTINATION"

export const setOrigin = (origin) => (dispatch) => {
	dispatch({ type: SET_ORIGIN, payload: origin })
}

export const setDestination = (destination) => (dispatch) => {
	dispatch({ type: SET_DESTINATION, payload: destination })
}
