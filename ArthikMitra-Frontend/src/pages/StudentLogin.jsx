import { useState } from "react";
import "./studentlogin.css";
import { registerUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit (Login / Register)
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
        window.dispatchEvent(new Event("authChanged"));

        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("✅ Login Successful!");

        // Redirect to dashboard / AI coach / student portal
        navigate("/ai-coach");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
