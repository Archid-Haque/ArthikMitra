import axios from "axios";

// Create connection to backend server
const API = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

// Function to send question to AI backend
export const askAI = async (question) => {
  try {
    const response = await API.post("/api/ai", { question }); // ✅ correct route
    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
