import axios from "axios";
import { API_BASE_URL } from "@env";

export const getWayPoints = async (origin, destination, preference) => {
  const data = {
    origin: origin,
    destination: destination,
    preference: preference,
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/directions/getWayPoints`,
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
  const urlRoute = `${API_BASE_URL}/api/authentication/register`;
  const res = await axios.post(urlRoute, userData);
  console.log(res.data);
  return "done";
};

export const fetchObjectsInRegion = async (region) => {
  const itmes = await axios.post(`${API_BASE_URL}/api/items/region`, region);
  console.log(itmes.data[0]);
  return itmes.data;
};
