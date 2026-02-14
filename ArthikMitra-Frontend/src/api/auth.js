import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// LOGIN
export const loginUser = (data) => API.post("/auth/login", data);

// GET SESSION (Protected)
export const getSession = (token) =>
  API.get("/session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
