import axios from "axios";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

const API = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

const refreshClient = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (!originalRequest) {
			return Promise.reject(error);
		}

		const requestUrl = originalRequest.url || "";
		const isRefreshRequest = /\/auth\/refresh(?:\?|$)/.test(requestUrl);
		const isAuthBypassRequest = /\/auth\/(?:login|register|forgot-password|reset-password)(?:\?|$)/.test(requestUrl);

		if (error.response?.status !== 401 || isRefreshRequest || isAuthBypassRequest) {
			return Promise.reject(error);
		}

		if (originalRequest._retry) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			})
				.then((token) => {
					if (token) {
						originalRequest.headers = originalRequest.headers || {};
						originalRequest.headers["Authorization"] = `Bearer ${token}`;
					}
					return API(originalRequest);
				})
				.catch((err) => Promise.reject(err));
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			const authHeader = API.defaults.headers.common["Authorization"];
			const headers = authHeader ? { Authorization: authHeader } : {};
			const refreshResponse = await refreshClient.post("/auth/refresh", {}, { headers });

			const newToken = refreshResponse.data?.token;
			if (newToken) {
				API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
				originalRequest.headers = originalRequest.headers || {};
				originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
			}

			processQueue(null, newToken);
			return API(originalRequest);
		} catch (refreshError) {
			processQueue(refreshError, null);

			const isProfileCheck = /\/auth\/profile(?:\?|$)/.test(requestUrl);
			if (typeof window !== "undefined" && !isProfileCheck) {
				window.dispatchEvent(new Event("ee:session-expired"));
			}

			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	}
);

export default API;
