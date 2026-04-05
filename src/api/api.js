// src/api/api.js
import axios from "axios";
import store from "../store/reducers/store";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        // Get the current auth state from Redux store
        const state = store.getState();
        const token = state?.auth?.user?.jwtToken;

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ── Response interceptor: handle 401 globally ───────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Token expired or invalid — clear auth and redirect to login
            localStorage.removeItem("auth");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("client-secret");
            // Dispatch logout
            store.dispatch({ type: "LOG_OUT" });
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;