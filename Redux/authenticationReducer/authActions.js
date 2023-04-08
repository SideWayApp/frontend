export const SET_TOKEN = "SET_TOKEN";
export const GET_TOKEN = "GET_TOKEN";

export const setToken = (token) => (dispatch) => {
  dispatch({ type: SET_TOKEN, payload: token });
};

export const getToken = () => (dispatch) => {
  return dispatch({ type: GET_TOKEN });
};
