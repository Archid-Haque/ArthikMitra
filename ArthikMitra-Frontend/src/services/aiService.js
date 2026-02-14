import axios from "axios";

// Create connection to backend server
const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Function to send question to AI backend
export const askAI = async (question) => {
  const response = await API.post("/ask", { question });
  return response.data;
};
