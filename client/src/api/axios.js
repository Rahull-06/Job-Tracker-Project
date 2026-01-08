import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:4000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// 🔐 attach token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
