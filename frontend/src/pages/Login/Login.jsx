import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "../../api/axios";
import { motion } from "framer-motion";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleLoginFormChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", loginData);
      const data = response.data;
      localStorage.setItem("token", data.token)
      const user = {
        id: data.id,
        role: data.role
      }
      localStorage.setItem("user", JSON.stringify(user));
      
      if (data.role === 'customer') {
        navigate('/Customer_dashboard')
      } else if (data.role === 'service_provider') {
        navigate('/Provider_dashboard')
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-form"
      >
        <form onSubmit={handleLoginFormSubmit}>
          <h2>Welcome Back</h2>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="Enter your username"
                value={loginData.username} 
                onChange={handleLoginFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="••••••••"
                value={loginData.password} 
                onChange={handleLoginFormChange}
                required
              />
            </div>
            <button className="login-btn" type="submit">Sign In</button>
            <div className="signup-text">
              Don't have an account? <Link to='/Signup'>Create one now</Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login