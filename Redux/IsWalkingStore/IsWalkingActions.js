export const SET_IS_WALKING = "SET_IS_WALKING"

export const setIsWalking = (state) => (dispatch) => {
	dispatch({ type: SET_IS_WALKING, payload: state })
}
