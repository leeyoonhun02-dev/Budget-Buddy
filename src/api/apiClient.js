import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://budget-buddy-api-er9y.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "budgetBuddyToken"
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem(
        "budgetBuddyToken"
      );

      if (token) {
        localStorage.removeItem(
          "budgetBuddyToken"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;