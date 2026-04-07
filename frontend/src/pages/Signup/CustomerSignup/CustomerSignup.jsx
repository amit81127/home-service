import GetLocation from "../../../Utils/GetLocation.js";
import { useState, useEffect, useRef } from "react";
import axios from "../../../api/axios";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

function CustomerSignup() {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Get My Location");
  const [isAlertDisplay, setAlertDisplay] = useState("none");
  const [signupMessage, setSignupMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const usernameErr = useRef(null);
  const passwordErr = useRef(null)
  const confirmPasswordErr = useRef(null)
  const emailErr = useRef(null)
  const phoneErr = useRef(null)
  const noLocation = useRef(null)

  const scrollToElement = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }

  useEffect(() => {
    if (isAlertDisplay === "flex") {
      const signupAlertTimeout = setTimeout(() => {
        setAlertDisplay("none");
      }, 4000);

      return () => clearTimeout(signupAlertTimeout);
    }
  }, [isAlertDisplay]);

  const handleCustomerFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocation = async () => {
    try {
      const loc = await GetLocation();
      setLocation(loc);
      setLocationText("Location Secured");
    } catch (error) {
      alert("Cannot fetch your location. Please check browser permissions.");
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      scrollToElement(passwordErr)
      setErrors(newErrors)
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      scrollToElement(confirmPasswordErr)
      setErrors(newErrors)
      return false;
    }
    if (!location) {
      newErrors.location = "Location required for setup";
      scrollToElement(noLocation)
      setErrors(newErrors)
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  const handleCustomerFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);

    if (location) {
      data.append("location", JSON.stringify(location));
    }

    try {
      await axios.post("/CustomerSignup", formData);
      setFormData({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        address: "",
      });
      setAlertDisplay("flex");
      setSignupMessage("Welcome! Registration successful.");
      setAlertColor("var(--primary)");
      setLocation(null);
      setLocationText("Get My Location");
    } catch (err) {
      let field;
      if (err.response && err.response.data) {
        field = err.response.data.field;
      }

      let newErrors = {};
      if (field === "username") {
        newErrors.username = "Username already exists";
        scrollToElement(usernameErr);
      }
      else if (field === "email") {
        newErrors.email = "Email is already registered";
        scrollToElement(emailErr);
      }
      else if (field === "phone") {
        newErrors.phone = "Phone number already in use";
        scrollToElement(phoneErr);
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="signup-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="signup-form-container"
      >
        <form onSubmit={handleCustomerFormSubmit} className="provider-signup">
          <div className="top-heading">
            <h2>Customer Sign Up</h2>
            <p>Join Servease to access premium services.</p>
          </div>
          
          <div className="signup-form-element">
            <label htmlFor="fullname" className="signup-form-label">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="e.g. John Doe"
              id="fullname"
              value={formData.fullname}
              required
              onChange={handleCustomerFormDataChange}
            />
          </div>

          <div className="signup-form-element">
            <label htmlFor="username" className="signup-form-label" ref={usernameErr}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              id="username"
              value={formData.username}
              required
              onChange={handleCustomerFormDataChange}
            />
            {errors.username && <span className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{errors.username}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="password" className="signup-form-label" ref={passwordErr}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              id="password"
              value={formData.password}
              required
              onChange={handleCustomerFormDataChange}
            />
            {errors.password && <span className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{errors.password}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="confirmPassword" className="signup-form-label" ref={confirmPasswordErr}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              id="confirmPassword"
              value={formData.confirmPassword}
              required
              onChange={handleCustomerFormDataChange}
            />
            {errors.confirmPassword && <span className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{errors.confirmPassword}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="email" className="signup-form-label" ref={emailErr}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              id="email"
              value={formData.email}
              required
              onChange={handleCustomerFormDataChange}
            />
            {errors.email && <span className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{errors.email}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="contact-number" className="signup-form-label" ref={phoneErr}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              id="contact-number"
              value={formData.phone}
              onChange={handleCustomerFormDataChange}
              required
            />
            {errors.phone && <span className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{errors.phone}</span>}
          </div>

          <div className="signup-form-element-textarea">
            <label htmlFor="address" className="signup-form-label">
              Detailed Address
            </label>
            <textarea
              name="address"
              id="address"
              placeholder="Enter your complete home address"
              value={formData.address}
              required
              onChange={handleCustomerFormDataChange}
            ></textarea>
          </div>

          <div className="signup-form-element" ref={noLocation}>
            <div className="location-label">
              <label className="signup-form-label">Device Location</label>
              <p className="location-text">Required for finding nearby service providers</p>
            </div>

            <div className="location-btn-container">
              <button
                className="location-btn"
                type="button"
                onClick={handleLocation}
                style={{ 
                  borderColor: location ? 'var(--primary)' : 'var(--border)',
                  color: location ? 'var(--primary)' : 'var(--text-muted)'
                }}
              >
                {locationText}
              </button>
            </div>
            {errors.location && <span className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{errors.location}</span>}
          </div>

          <button type="submit" className="signup-submit-btn">
            Create Account
          </button>
        </form>

        <div
          className="alert-signup"
          style={{ display: isAlertDisplay, background: alertColor }}
        >
          <span>{signupMessage}</span>
          <CloseIcon className="signup-close" onClick={() => setAlertDisplay("none")} />
        </div>
      </motion.div>
    </div>
  );
}

export default CustomerSignup;
