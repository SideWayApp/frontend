import axios from "axios";
import { API_BASE_URL } from "@env";

const BASE_URL = "http://10.0.0.8:8080/directions/getXYListinBestRoute";

export const getWayPoints = async(origin,destination,preference) =>{
  const data = {
    origin: origin,
    destination: destination,
    preference: preference,
  };
  console.log(data);
  try {
    const response = await axios.post(
      "http://10.100.102.4:8080/directions/getWayPoints",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch directions");
  }
}

export const getDirectionsOne = async (origin, destination, preference) => {
  const data = {
    origin: origin,
    destination: destination,
    preference: preference,
  };
  console.log(data);
  try {
    const response = await axios.post(
      "http://10.100.102.4:8080/directions/getXYListinBestRoute",
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
  let data = userData;
  delete data.signUpData.rePassword;
  console.log(data);
  return "done";
};
