import axios from "axios";
// import { API_BASE_URL } from "@env";
import store from "./Redux/store";
// const token = useSelector((state) => state.auth.token);
import { setToken, setUser } from "./Redux/authenticationReducer/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_BASE_URL = "https://sidewayapp-backend.onrender.com"

console.log(API_BASE_URL);

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
    if (e.response.status === 403) {
      await refreshToken();
    }
    return null;
  }
};

const refreshToken = async () => {
  try {
    const tokens = store.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    };
    const data = await axios.get(
      `${API_BASE_URL}/api/authentication/refreshToken`,
      config
    );
    await AsyncStorage.setItem("token", JSON.stringify(data.data));
    store.dispatch(setToken(data.data));
  } catch (e) {
    console.log("refresh", e);
  }
};

export const logout = async (token) => {
  try {
    const tokens = store.getState().auth.token;
    console.log(tokens);
    const config = {
      headers: {
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    };
    const res = await axios.get(
      `${API_BASE_URL}/api/authentication/logout`,
      config
    );
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
    console.log("getUserData", e.response.status);
    if (e.response.status === 403) {
      await refreshToken();
    }
  }
};

export const addRecent = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/addRecent`;
    const res = await axios.put(urlRoute, item, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error, "addRecent failed in axios");
    if (error.response.status === 403) {
      await refreshToken();
      await addRecent(item, store.getState().auth.token);
    }
  }
};
export const addFavorite = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/addFavorite`;
    const res = await axios.put(urlRoute, item, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error, "addFavorite failed in axios");
    if (error.response.status === 403) {
      await refreshToken();
      await addFavorite(item, store.getState().auth.token);
    }
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
      headers: { Authorization: `Bearer ${token.accessToken}` },
      data: { recent: item },
    });
    return res.data;
  } catch (error) {
    console.log(error, "deleteRecent failed in axios");
    if (error.response.status === 403) {
      await refreshToken();
      await deleteRecent(item, store.getState().auth.token);
    }
  }
};

export const deleteFavorite = async (item, token) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/deleteFavorite`;
    const res = await axios.delete(urlRoute, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
      data: { favorite: item },
    });
    return res.data;
  } catch (error) {
    console.log(error, "deleteFavorite failed in axios");
    if (error.response.status === 403) {
      await refreshToken();
      await deleteFavorite(item, store.getState().auth.token);
    }
  }
};

export const addMapItem = async (data) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/items/add`;
    const res = await axios.post(urlRoute, data);
    return res.data;
  } catch (error) {
    console.log(error, "addMapItem failed in axios");
  }
};

export const addMapItemFromLatLong = async (data) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/items/addFromLatLong`;
    const res = await axios.post(urlRoute, data);
    return res.data;
  } catch (error) {
    console.log(error, "addMapItem failed in axios");
  }
};

export const updateUserPrefrences = async (data) => {
  try {
    const token = store.getState().auth.token;
    const urlRoute = `${API_BASE_URL}/api/authentication/editUserPreferences`;
    const res = await axios.put(urlRoute, data, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    console.log(res.data);
    if (res.data == "preferences changed") await getUserData();
    return res.data;
  } catch (error) {
    console.log(error, "editUserPreferences failed in axios");
    console.log(error.response.status);
  }
};
