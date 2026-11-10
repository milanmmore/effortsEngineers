import axios from "axios";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

const API = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

API.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		const requestUrl = error.config?.url || "";
		const isLoginRequest = /\/auth\/login(?:\?|$)/.test(requestUrl);
		if (
			typeof window !== "undefined" &&
			error.response?.status === 401 &&
			!isLoginRequest &&
			localStorage.getItem("token")
		) {
			localStorage.removeItem("token");
			delete API.defaults.headers.common.Authorization;
			window.location.replace("/auth/login");
		}

		return Promise.reject(error);
	}
);

export default API;
