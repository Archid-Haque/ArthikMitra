import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login state + listen for changes
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    // Listen if login/logout happens in another tab or after reload
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload(); // reset protected routes cleanly
  };

  // ✅ Login Redirect
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>ArthikMitra</h2>

      <div style={styles.right}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/learn">Learn</Link>

        {/* Show only if logged in */}
        {isLoggedIn && (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/ai-coach">AI Coach</Link>
          </>
        )}

        {/* Toggle Login / Logout */}
        {!isLoggedIn ? (
          <button style={styles.login} onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 8%",
    background: "#020617",
    borderBottom: "1px solid rgba(163,255,18,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    margin: 0,
    color: "#A3FF12",
    fontWeight: "700",
    letterSpacing: "1px",
    fontSize: "22px"
  },

  right: {
    display: "flex",
    alignItems: "center"
  },

  link: {
    color: "#E5E7EB",
    marginLeft: "28px",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px"
  },

  login: {
    marginLeft: "32px",
    padding: "8px 20px",
    border: "1px solid #A3FF12",
    background: "transparent",
    color: "#A3FF12",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  },

  logout: {
    marginLeft: "32px",
    padding: "8px 20px",
    border: "1px solid #ff4d4d",
    background: "transparent",
    color: "#ff4d4d",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default Navbar;
