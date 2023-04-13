import axios from "axios"
import { API_BASE_URL } from "@env"

export const getStreetsStartingWith = async (letters) => {
	const data = { letters }
	try {
		const response = await axios.post(
			`${API_BASE_URL}/api/streets/getStreetsStartingWith/${letters}`,
			data
		)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch streets")
	}
}

export const getAddressFromLatLng = async (latitude, longitude) => {
	const data = {
		latitude: latitude,
		longitude: longitude,
	}

	try {
		const response = await axios.post(
			`${API_BASE_URL}/directions/getAddressFromLatLng`,
			data
		)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch Address")
	}
}

export const getWayPoints = async (origin, destination, preference) => {
	const data = {
		origin: origin,
		destination: destination,
		preference: preference,
	}
	try {
		const response = await axios.post(
			`${API_BASE_URL}/directions/getWayPoints`,
			data
		)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch directions")
	}
}

export const getDirectionsOne = async (origin, destination, preference) => {
	const data = {
		origin: origin,
		destination: destination,
		preference: preference,
	}
	try {
		const response = await axios.post(
			`${API_BASE_URL}/directions/getXYListinBestRoute`,
			data
		)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch directions")
	}
}
/*    origin: "Louis Marshall 41, Tel Aviv",
    destination: "Ahi Dakar 1, Tel Aviv",
    preference: "clean",*/

export const signUpUser = async (userData) => {
	try {
		const urlRoute = `${API_BASE_URL}/api/authentication/register`
		const res = await axios.post(urlRoute, userData)
		console.log(res.data)
		return "done"
	} catch (error) {
		console.log(error)
	}
}

export const login = async (data) => {
	try {
		const urlRoute = `${API_BASE_URL}/api/authentication/login`
		const res = await axios.post(urlRoute, data)
		return res.data.access
	} catch (e) {
		console.log("login", e)
	}
}

export const getUserData = async (token) => {
	try {
		console.log("getUser", token)
		const user = {
			email: "guy@guy.guy",
			preferences: {
				accessibility: true,
				clean: false,
				scenery: false,
				security: true,
				speed: false,
			},
			signUpData: {
				name: "Guy",
				gender: "male",
				age: "26",
			},
		}
		return user
	} catch (e) {}
}

export const fetchObjectsInRegion = async (region) => {
	const itmes = await axios.post(`${API_BASE_URL}/api/items/region`, region)
	return itmes.data
}
