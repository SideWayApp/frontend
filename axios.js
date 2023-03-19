import axios from "axios"

const BASE_URL = "http://10.0.0.8:8080/api/directions"

export const getDirections = async (origin, destination, preference) => {
	const data = {
		origin: "Louis Marshall 41, Tel Aviv",
		destination: "Ahi Dakar 1, Tel Aviv",
		preference: "clean",
	}
	console.log(data)
	try {
		const response = await axios.post("http://10.0.0.8:8080/api/directions", data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch directions")
	}
}
