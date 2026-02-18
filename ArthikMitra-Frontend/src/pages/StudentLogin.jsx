import { useState } from "react";
import "./studentlogin.css";
import { registerUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

function StudentLogin() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ============================
  // HANDLE INPUT CHANGE
  // ============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ============================
  // GOOGLE LOGIN HANDLER 🔥
  // ============================
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // Send Google user to backend
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });

      // Save login session
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Notify Navbar to update instantly
      window.dispatchEvent(new Event("authChanged"));

      alert("✅ Google Login Successful!");
      navigate("/ai-coach");

    } catch (err) {
      console.error("Google Login Failed:", err);
      alert("Google Login Failed");
    }
  };

  // ============================
  // HANDLE SUBMIT (LOGIN / REGISTER)
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all required fields");
    }

    if (isRegister) {
      if (!form.name) return alert("Enter your name");
      if (form.password !== form.confirmPassword)
        return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      if (isRegister) {
        // REGISTER CALL
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

        alert("✅ Registration Successful! Please Login.");
        setIsRegister(false);
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

      } else {
        // LOGIN CALL
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        // Save session
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.dispatchEvent(new Event("authChanged"));

        alert("✅ Login Successful!");
        navigate("/ai-coach");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="login-page">
      <div className="login-card">

        <h2>{isRegister ? "Create Account" : "Student Login"}</h2>

        <p className="login-sub">
          {isRegister
            ? "Start your financial journey today."
            : "Welcome back to ArthikMitra"}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>

          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {/* ================= GOOGLE BUTTON ================= */}
        <div style={{ marginTop: "22px", display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
        {/* ================================================= */}

        <div className="login-toggle">
          {isRegister ? (
            <>
              Already have an account?
              <span onClick={() => setIsRegister(false)}> Login</span>
            </>
          ) : (
            <>
              New here?
              <span onClick={() => setIsRegister(true)}> Create Account</span>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentLogin;
