import GetLocation from "../../../Utils/GetLocation.js";
import { compressImage } from "../../../Utils/CompressImage.js";
import { useState, useEffect , useRef} from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

function CustomerSignup() {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Get Location");
  const [locationBtnBorder, setLocationBtnBorder] = useState(
    "2px solid rgb(86, 189, 230)",
  );
  const [isAlertDisplay, setAlertDisplay] = useState("none");
  const [signupMessage, setSignupMessage] = useState("none");
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
  const passowordErr = useRef(null)
  const confirmPassowordErr = useRef(null)
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
    if (isAlertDisplay == "flex") {
      const signupAlertTimeout = setTimeout(() => {
        setAlertDisplay("none");
      }, 4000);

      return () => clearTimeout(signupAlertTimeout);
    }
  }, [isAlertDisplay == "flex"]);

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
      setLocationText("Location Obtained");
      setLocationBtnBorder("2px solid green");
    } catch (error) {
      setlocationErr(error);
      alert("Cannot fetch your location");
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      scrollToElement(passowordErr)
      setErrors(newErrors)
      return false;
    }

    if (formData.password != formData.confirmPassword) {
      newErrors.confirmPassword = "Password should match";
      scrollToElement(confirmPassowordErr)
      setErrors(newErrors)
      return false;
    }
    if(!location){
      newErrors.location = "Location required";
      scrollToElement(noLocation)
      setErrors(newErrors)
      return false;
    }

    setErrors(newErrors);
    // return true if newErrors is empty
    return true;
  };

  const handleCustomerFormSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()){
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
      const response = await axios.post("/api/CustomerSignup", data);
      setFormData({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        address: "",
      });
      data.append("location", null);
      setAlertDisplay("flex");
      setSignupMessage("Signup successful, Log in now");
      setAlertColor("rgb(86, 189, 230)");
      setLocationBtnBorder("2px solid rgb(86, 189, 230)");
      setLocationText("Get Location");
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
    newErrors.email = "Please provide a different email";
    scrollToElement(emailErr);
  } 
  else if (field === "phone") {
    newErrors.phone = "Please provide different mobile number";
    scrollToElement(phoneErr);
  }

  setErrors(newErrors);
}
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form onSubmit={handleCustomerFormSubmit} className="provider-signup">
          <div className="top-heading">
            <h2 className="provider-signup-heading">Customer Sign Up</h2>
            <p>Fill in your details to get started.</p>
          </div>
          <div className="signup-form-element">
            <label htmlFor="fullname" className="signup-form-label">
              Full Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter full name"
              id="fullname"
              value={formData.fullname}
              required
              onChange={handleCustomerFormDataChange}
            />
          </div>
          <div className="signup-form-element">
            <label htmlFor="username" className="signup-form-label" ref={usernameErr}>
              Username<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              id="username"
              value={formData.username}
              required
              onChange={handleCustomerFormDataChange}
            />
          </div>
          {errors.username && <p style={{color:"red"}}>{errors.username}</p>}
          <div className="signup-form-element">
            <label htmlFor="password" className="signup-form-label">
              Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              id="passoword"
              value={formData.password}
              required
              onChange={handleCustomerFormDataChange}
              ref={passowordErr}
            />
          </div>
          {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
          <div className="signup-form-element">
            <label htmlFor="confirmPassword" className="signup-form-label" ref = {confirmPassowordErr}>
              Confirm Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              id="confirmPassoword"
              value={formData.confirmPassword}
              required
              onChange={handleCustomerFormDataChange}
            />
          </div>
          {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword}</p>}
          <div className="signup-form-element">
            <label htmlFor="email" className="signup-form-label" ref={emailErr}>
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              id="email"
              value={formData.email}
              required
              onChange={handleCustomerFormDataChange}
            />
          </div>
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
          <div className="signup-form-element">
            <label htmlFor="contact-number" className="signup-form-label" ref={phoneErr}>
              Phone Number<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="Enter phone number"
              id="contact-number"
              value={formData.phone}
              onChange={handleCustomerFormDataChange}
              required
            />
          </div>
          {errors.phone && <p style={{color:"red"}}>{errors.phone}</p>}
          <div className="signup-form-element-textarea">
            <label
              htmlFor="address"
              name="address"
              className="signup-form-label"
            >
              Address<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="address"
              id="address"
              placeholder="Enter address"
              className="hoverEffect focusEffect"
              value={formData.address}
              required
              onChange={handleCustomerFormDataChange}
            ></textarea>
          </div>
          <div className="signup-form-element" ref={noLocation}>
            <div className="location-label">
              <label htmlFor="user-location" className="signup-form-label">
                Provide Location
                <span style={{ color: "red" }}>*</span>
              </label>
              
              <p className="location-text">
                (Provide location for better visibility)
              </p>
            </div>

            <div className="location-btn-container">
              <button
                className="location-btn hoverEffect"
                type="button"
                onClick={handleLocation}
                style={{ border: locationBtnBorder }}
              >
                {locationText}
              </button>

            </div>

          </div>
          {errors.location && <p style={{color:"red"}}>{errors.location}</p>}
          <div className="upload-img">
            <button type="submit" className="signup-submit-btn">
              Submit
            </button>
          </div>
        </form>
        <div
          className="alert-signup"
          style={{ display: isAlertDisplay, background: alertColor }}
        >
          {signupMessage}
          <CloseIcon className="signup-close" />
        </div>
      </div>
    </div>
  );
}

export default CustomerSignup;
