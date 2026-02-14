import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./roleselect.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // ✅ Basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Save JWT + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ Redirect to protected page
      navigate("/student");

      // ✅ Force refresh so Navbar updates to Logout
      window.location.reload();

    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Allow ENTER key login
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="role-page">
      <h2 className="role-heading">
        Student <span>Login</span>
      </h2>

      <div className="login-card">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Initializing..." : "Initialize Session"}
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;
