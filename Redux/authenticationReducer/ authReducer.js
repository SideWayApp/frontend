import { SET_TOKEN, GET_TOKEN } from "./authActions";

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case GET_TOKEN:
      return state.token;
    default:
      return state;
  }
};

export default authReducer;
