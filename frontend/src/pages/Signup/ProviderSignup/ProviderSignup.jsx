import "./ProviderSignup.css";
import "../Signup.css"
import GetLocation from "../../../Utils/GetLocation.js";
import { compressImage } from "../../../Utils/CompressImage.js";
import { useState, useEffect , useRef} from "react";
import axios from "../../../api/axios";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

function ProviderSignup() {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Get Business Location");
  const [compressedImage, setCompressedImage] = useState(null);
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
    category: "",
    experience: "",
    address: "",
    description: "",
    price: "",
    business_name: "",
  });

  const [errors, setErrors] = useState({});
  const usernameErr = useRef(null);
  const passwordErr = useRef(null)
  const confirmPasswordErr = useRef(null)
  const priceErr = useRef(null)
  const emailErr = useRef(null)
  const phoneErr = useRef(null)
  const noLocation = useRef(null)

  const scrollToElement = (ref)=>{
    if(ref && ref.current){
      ref.current.scrollIntoView({
        behavior : "smooth",
        block : "start"
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

  const handleProviderFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      setCompressedImage(compressed);
    } catch (err) {
      console.error("Compression error:", err);
    }
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
      newErrors.password = "Minimum 6 characters required";
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

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Please set a valid price";
      scrollToElement(priceErr)
      setErrors(newErrors)
      return false;
    }

    if(!location){
      newErrors.location = "Business location is required";
      scrollToElement(noLocation)
      setErrors(newErrors)
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  const handleProviderFormSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (location) data.append("location", JSON.stringify(location));
    if (compressedImage) data.append("image", compressedImage);

    try {
      await axios.post("/api/providerSignup", data);
      setFormData({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        category: "",
        experience: "",
        address: "",
        description: "",
        price: "",
        business_name: "",
      });
      setCompressedImage(null);
      setAlertDisplay("flex");
      setSignupMessage("Welcome! Your provider account is ready.");
      setAlertColor("var(--primary)");
      setLocation(null);
      setLocationText("Get Business Location");
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
        <form onSubmit={handleProviderFormSubmit} className="provider-signup">
          <div className="top-heading">
            <h2>Provider Sign Up</h2>
            <p>Ready to showcase your skills? Register now.</p>
          </div>

          <div className="signup-form-element">
            <label htmlFor="fullname" className="signup-form-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="e.g. Michael Smith"
              id="fullname"
              value={formData.fullname}
              required
              onChange={handleProviderFormDataChange}
            />
          </div>

          <div className="signup-form-element">
            <label htmlFor="business_name" className="signup-form-label">Business Name</label>
            <input
              type="text"
              name="business_name"
              placeholder="e.g. Smith & Sons Plumbing"
              id="business_name"
              value={formData.business_name}
              required
              onChange={handleProviderFormDataChange}
            />
          </div>

          <div className="signup-form-element">
            <label htmlFor="username" className="signup-form-label" ref={usernameErr}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a professional handle"
              id="username"
              value={formData.username}
              required
              onChange={handleProviderFormDataChange}
            />
            {errors.username && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.username}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="password" className="signup-form-label" ref={passwordErr}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              id="password"
              value={formData.password}
              required
              onChange={handleProviderFormDataChange}
            />
            {errors.password && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.password}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="confirmPassword" className="signup-form-label" ref={confirmPasswordErr}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              id="confirmPassword"
              value={formData.confirmPassword}
              required
              onChange={handleProviderFormDataChange}
            />
            {errors.confirmPassword && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.confirmPassword}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="email" className="signup-form-label" ref={emailErr}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="mike@business.com"
              id="email"
              value={formData.email}
              required
              onChange={handleProviderFormDataChange}
            />
            {errors.email && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.email}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="phone" className="signup-form-label" ref={phoneErr}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              id="phone"
              value={formData.phone}
              onChange={handleProviderFormDataChange}
              required
            />
            {errors.phone && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.phone}</span>}
          </div>

          <div className="signup-form-element">
            <label htmlFor="category" className="signup-form-label">Service Category</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              required
              onChange={handleProviderFormDataChange}
            >
              <option value="">Select your specialty</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Repair">Repair</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Shifting">Shifting</option>
              <option value="Painting">Painting</option>
              <option value="Electrical">Electrical</option>
              <option value="Gardening">Gardening</option>
              <option value="Carwash">Car Wash</option>
            </select>
          </div>

          <div className="signup-form-element">
            <label htmlFor="experience" className="signup-form-label">Years of Experience</label>
            <select
              name="experience"
              id="experience"
              value={formData.experience}
              required
              onChange={handleProviderFormDataChange}
            >
              <option value="">How long have you been working?</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5+ Years</option>
            </select>
          </div>

          <div className="signup-form-element-textarea">
            <label htmlFor="address" className="signup-form-label">Business Address</label>
            <textarea
              name="address"
              id="address"
              placeholder="Full address of your base/office"
              value={formData.address}
              required
              onChange={handleProviderFormDataChange}
            ></textarea>
          </div>

          <div className="signup-form-element-textarea">
            <label htmlFor="description" className="signup-form-label">Service Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Tell customers what makes your service great..."
              value={formData.description}
              required
              onChange={handleProviderFormDataChange}
              style={{height: '150px'}}
            ></textarea>
          </div>

          <div className="signup-form-element">
            <label htmlFor="price" className="signup-form-label" ref={priceErr}>Base Rate (₹/hr)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 500"
              id="price"
              value={formData.price}
              required
              onChange={handleProviderFormDataChange}
            />
            {errors.price && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.price}</span>}
          </div>

          <div className="signup-form-element" ref={noLocation}>
            <div className="location-label">
              <label className="signup-form-label">Business Location</label>
              <p className="location-text">Required for being discoverable in search results</p>
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
            {errors.location && <span style={{color: "red", fontSize: "0.8rem"}}>{errors.location}</span>}
          </div>

          <div className="signup-form-element">
            <label className="signup-form-label">Showcase Image</label>
            <div className="img-input-wrapper" style={{ borderColor: compressedImage ? 'var(--primary)' : 'var(--border)' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="img-input"
                required
              />
              <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                {compressedImage ? "✓ Image selected and optimized" : "Upload a photo of your work or business logo"}
              </p>
            </div>
          </div>

          <button type="submit" className="signup-submit-btn">Register as Provider</button>
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

export default ProviderSignup;
