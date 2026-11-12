import axios from "axios";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

const API = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		const requestUrl = error.config?.url || "";
		const isAuthBootstrapOrPublicRequest = /\/auth\/(?:login|register|forgot-password|reset-password|profile|logout)(?:\?|$)/.test(requestUrl);
		if (
			typeof window !== "undefined" &&
			error.response?.status === 401 &&
			!isAuthBootstrapOrPublicRequest
		) {
			window.dispatchEvent(new Event("ee:session-expired"));
		}

		return Promise.reject(error);
	}
);

export default API;
