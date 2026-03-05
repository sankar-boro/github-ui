import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export const repositoriesApi = {
  getAll: () => api.get("/repositories"),
  getById: (id: string) => api.get(`/repositories/${id}`),
  create: (data: any) => api.post("/repositories", data),
  update: (id: string, data: any) => api.put(`/repositories/${id}`, data),
  delete: (id: string) => api.delete(`/repositories/${id}`),
};

export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post("/auth/login", credentials),
  register: (userData: any) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
};

export const userApi = {
  getProfile: (username: string) => api.get(`/users/${username}`),
  updateProfile: (data: any) => api.put("/user", data),
  getRepositories: (username: string) =>
    api.get(`/users/${username}/repositories`),
};

export default api;
