import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Signup.css";

function Signup() {
  return (
    <div className="choose-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="signup-option"
      >
        <h2>Join Us Today</h2>
        <div className="signup-buttons-wrapper">
          <Link to="/CustomerSignup">
            <button className="btn-signup-option primary">Register as Customer</button>
          </Link>
          <Link to="/ProviderSignup">
            <button className="btn-signup-option">Register as Provider</button>
          </Link>
        </div>
        <div className="login-text">
          Already have an account? <Link to="/Login">Log In</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
