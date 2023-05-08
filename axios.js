import axios from "axios";
import { API_BASE_URL } from "@env";
import store from "./Redux/store";
// const token = useSelector((state) => state.auth.token);
import { setToken, setUser } from "./Redux/authenticationReducer/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const token = store.getState().auth;

export const getStreetsStartingWith = async (letters) => {
  const data = { letters };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/streets/getStreetsStartingWith/${letters}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch streets");
  }
};

export const getAddressFromLatLng = async (latitude, longitude) => {
  const data = {
    latitude: latitude,
    longitude: longitude,
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/directions/getAddressFromLatLng`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Address");
  }
};

export const getAddressFromCoordinates = async (latitude, longitude) => {
  const data = {
    latitude: latitude,
    longitude: longitude,
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/directions/getAddressFromCoordinates`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Address");
  }
};

export const getWayPointsAndInstructions = async (
  origin,
  destination,
  preference
) => {
  const data = {
    origin: origin,
    destination: destination,
    preference: preference,
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/directions/getWayPointsAndInstructions`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch directions");
  }
};

export const getInstructions = async (origin, destination, preference) => {
  const data = {
    origin: origin,
    destination: destination,
    preference: preference,
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/directions/getInstructions`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch directions");
  }
};

export const getDirectionsOne = async (origin, destination, preference) => {
  const data = {
    origin: origin,
    destination: destination,
    preference: preference,
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/directions/getXYListinBestRoute`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch directions");
  }
};

export const signUpUser = async (userData) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/register`;
    const res = await axios.post(urlRoute, userData);
    store.dispatch(setToken(res.data));
    await AsyncStorage.setItem("token", JSON.stringify(res.data));
    return "Success";
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/login`;
    const res = await axios.post(urlRoute, data);
    store.dispatch(setToken(res.data));
    await AsyncStorage.setItem("token", JSON.stringify(res.data));
    return "Success";
  } catch (e) {
    console.log("login", e);
    return null;
  }
};

export const logout = async (token) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/authentication/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log("logout", e);
  }
};

export const getUserData = async () => {
  const token = store.getState().auth.token;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    };
    const user = await axios.get(
      `${API_BASE_URL}/api/authentication/user`,
      config
    );
    // store.dispatch(setUser(user.data));
    store.dispatch(setUser(user.data));
    return user.data;
  } catch (e) {
    console.log(e);
  }
};

export const addRecent = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/addRecent`;
    const res = await axios.put(urlRoute, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error, "addRecent failed in axios");
  }
};
export const addFavorite = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/addFavorite`;
    const res = await axios.put(urlRoute, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error, "addFavorite failed in axios");
  }
};
export const fetchObjectsInRegion = async (region, preferences) => {
  try {
    region.preferences = preferences;
    const items = await axios.post(`${API_BASE_URL}/api/items/region`, region);
    return items.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecent = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/deleteRecent`;
    const res = await axios.delete(urlRoute, {
      headers: { Authorization: `Bearer ${token}` },
      data: { recent: item },
    });
    return res.data;
  } catch (error) {
    console.log(error, "deleteRecent failed in axios");
  }
};

export const deleteFavorite = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/deleteFavorite`;
    const res = await axios.delete(urlRoute, {
      headers: { Authorization: `Bearer ${token}` },
      data: { favorite: item },
    });
    return res.data;
  } catch (error) {
    console.log(error, "deleteFavorite failed in axios");
  }
};
