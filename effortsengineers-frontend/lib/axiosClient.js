import axios from "axios";

const configuredApiUrl = (
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).trim();
let apiUrl = configuredApiUrl;
if (apiUrl.startsWith("//")) {
	apiUrl = `https:${apiUrl}`;
} else if (!/^https?:\/\//i.test(apiUrl)) {
	const protocol = /^(localhost|127(?:\.\d{1,3}){3})(:\d+)?(?:\/|$)/i.test(apiUrl)
		? "http"
		: "https";
	apiUrl = `${protocol}://${apiUrl}`;
}

const API = axios.create({
	baseURL: `${apiUrl.replace(/\/+$/, "")}/api`,
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

export default API;
