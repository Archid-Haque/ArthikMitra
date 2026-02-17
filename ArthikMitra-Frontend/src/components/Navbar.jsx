import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* =====================================================
     CHECK LOGIN STATE + LISTEN FOR LOGIN/LOGOUT EVENTS
  ===================================================== */
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Initial check when component loads
    checkLogin();

    // 🔥 Detect login/logout inside SAME TAB
    window.addEventListener("authChanged", checkLogin);

    // 🔥 Detect login/logout from OTHER tabs
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("authChanged", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  /* =====================================================
     LOGOUT FUNCTION
  ===================================================== */
  const handleLogout = () => {
    localStorage.clear();

    // 🔥 Notify whole app user logged out
    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  /* =====================================================
     LOGIN REDIRECT
  ===================================================== */
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <img
        src="/src/img/logo.PNG"
        alt="ArthikMitra Logo"
        style={styles.logo}
      />

      <div style={styles.right}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/learn">Learn</Link>

        {/* Show these ONLY when logged in */}
        {isLoggedIn && (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/ai-coach">AI Coach</Link>
          </>
        )}

        {/* Toggle Button */}
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

/* =====================================================
   STYLES
===================================================== */
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
    width: "200px",
    height: "auto",
    cursor: "pointer"
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
