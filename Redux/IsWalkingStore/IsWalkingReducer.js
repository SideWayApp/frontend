import { SET_IS_WALKING } from "./IsWalkingActions"

const initialState = {
	isWalking: false,
}

const IsWalkingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_WALKING:
			return {
				...state,
				isWalking: action.payload,
			}
		default:
			return state
	}
}

export default IsWalkingReducer
