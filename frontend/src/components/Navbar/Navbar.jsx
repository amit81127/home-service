import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "/logo.png";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const category = "Popular";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!localStorage.getItem("token") && !!user;

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container max-width">
          <Link to="/" className="logoContainer">
            <img src={logo} alt="logo" className="nav-logo-img" />
            <span className="logo-text">SERVEASE</span>
          </Link>

          <div className="nav-menu">
            <ul>
              <li>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/Services/${category}`}
                  className={location.pathname.includes("/Services") ? "active" : ""}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/About" className={location.pathname === "/About" ? "active" : ""}>
                  About
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/Bookings" className={location.pathname === "/Bookings" ? "active" : ""}>
                    Bookings
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="nav-actions">
            {isAuthenticated ? (
              <div className="user-actions">
                <Link to={user.role === 'customer' ? "/Customer_dashboard" : "/Provider_dashboard"}>
                  <button className="btn-premium btn-primary">Dashboard</button>
                </Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            ) : (
              <div className="auth-btns">
                <Link to="/Login" className="login-link">Log In</Link>
                <Link to="/Signup">
                  <button className="btn-premium btn-primary">Get Started</button>
                </Link>
              </div>
            )}
            
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-dropdown glass-effect"
          >
            <div className="dropdown-links">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to={`/Services/${category}`} onClick={() => setIsOpen(false)}>Services</Link>
              <Link to="/About" onClick={() => setIsOpen(false)}>About</Link>
              {isAuthenticated && (
                <Link to="/Bookings" onClick={() => setIsOpen(false)}>Bookings</Link>
              )}
              <hr />
              {isAuthenticated ? (
                <>
                  <Link to={user.role === 'customer' ? "/Customer_dashboard" : "/Provider_dashboard"} onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/Login" onClick={() => setIsOpen(false)}>Log In</Link>
                  <Link to="/Signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
