import axios from "axios";
import { API_BASE_URL } from "@env";

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
/*    origin: "Louis Marshall 41, Tel Aviv",
    destination: "Ahi Dakar 1, Tel Aviv",
    preference: "clean",*/

export const signUpUser = async (userData) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/register`;
    const res = await axios.post(urlRoute, userData);
    return res.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data) => {
  try {
    const urlRoute = `${API_BASE_URL}/api/authentication/login`;
    const res = await axios.post(urlRoute, data);
    console.log(res.status);
    return res.data.accessToken;
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

export const getUserData = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const user = await axios.get(
      `${API_BASE_URL}/api/authentication/user`,
      config
    );
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
export const fetchObjectsInRegion = async (region, preferences) => {
  try {
    region.preferences = preferences;
    const items = await axios.post(`${API_BASE_URL}/api/items/region`, region);
    return items.data;
  } catch (error) {
    console.log(error);
  }
};
