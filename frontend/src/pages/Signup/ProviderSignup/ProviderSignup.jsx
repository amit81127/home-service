import './ProviderSignup.css'
import GetLocation from '../../../Utils/GetLocation.js'
import { compressImage } from '../../../Utils/CompressImage.js';
import {useState} from 'react'

function ProviderSignup() {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Get Location")
  const [locationErr, setlocationErr] = useState("");
  const [locationBtnBorder, setLocationBtnBorder] = useState("2px solid rgb(86, 189, 230)")
  const [imgBorder, setImgBorder] = useState("2px solid rgb(86, 189, 230)")
  const [compressedImage, setCompressedImage] = useState(null)

  const handleUpload = async (e)=>{
    const file = e.target.files[0];
    if(!file){
      return;
    } 
    
    try{
      const compressed = await compressImage(file);
      setCompressedImage(compressed);
      const formData = new FormData();
      formData.append("image", compressed);
      setImgBorder("2px solid green")
      console.log("commpression complete")
    } catch(err){
      console.error("Compression error:", err);
    }
  }

  const handleLocation = async() =>{
      try{
        const loc = await GetLocation();
        setLocation(loc);
        setLocationText("Location Obtained")
        setLocationBtnBorder("2px solid green")
      } catch(error){
        setlocationErr(error)
        alert("Cannot fetch your location")
      }
  }


  return (
    <div className='provider-signup-container'>
      <div className="provider-signup-form-container">
        <form action="" className="provider-signup">
          <div className="top-heading">
          <h2 className='provider-signup-heading'>Provider Sign Up</h2>
        <p>Fill in your details to get started.</p>
          </div>
        
        <div className="signup-form-element">
          <label htmlFor="fullname" className='signup-form-label'>Full Name<span style={{color: "red"}}>*</span></label>
          <input type="text" placeholder='Enter full name' id="fullname"/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="username" className='signup-form-label'>Username<span style={{color: "red"}}>*</span></label>
          <input type="text" placeholder='Enter username' id="username"/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="password" className='signup-form-label'>Password<span style={{color: "red"}}>*</span></label>
          <input type="password" placeholder='Enter password' id="passowrd"/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="confirmPassword" className='signup-form-label'>Confirm Password<span style={{color: "red"}}>*</span></label>
          <input type="password" placeholder='Confirm password' id="confirmPassowrd"/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="email" className='signup-form-label'>Email<span style={{color: "red"}}>*</span></label>
          <input type="email" placeholder='Enter email' id="email"/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="contact-number" className='signup-form-label'>Phone Number<span style={{color: "red"}}>*</span></label>
          <input type="number" placeholder='Enter phone number' id="contact-number"/>
        </div>
        <div className="signup-form-element">
          <label htmlFor="category" className='signup-form-label'>Choose Category<span style={{color: "red"}}>*</span></label>
          <select name="category" id="category">
            <option value="">Choose Category</option>
            <option value="cleaning">Cleaning</option>
            <option value="repair">Repair</option>
            <option value="plumbing">Plumbing</option>
            <option value="shifting">Shifting</option>
            <option value="painting">Painting</option>
            <option value="electrical">Electrical</option>
            <option value="gardening">Gardening</option>
            <option value="carwash">Car Wash</option>
          </select>
        </div>
        <div className="signup-form-element">
          <label htmlFor="experience" className='signup-form-label'>Experience</label>
          <select name="category" id="category">
            <option value="">Experience in years</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4+">More than 4</option>
          </select>
        </div>
        <div className="signup-form-element-textarea">
          <label htmlFor="address" className='signup-form-label'>Address<span style={{color: "red"}}>*</span></label>
          <textarea name="address" id="address" placeholder='Enter address' className="hoverEffect focusEffect"></textarea>
        </div>
        <div className="signup-form-element-textarea">
          <label htmlFor="provider-about" className='signup-form-label'>Description<span style={{color: "red"}}>*</span></label>
          <textarea name="provider-about" id="provider-about" placeholder='Complete discription about your services' className='hoverEffect focusEffect'></textarea>
        </div>
        <div className="signup-form-element">
          <div className="location-label">
            <label htmlFor="user-location" className='signup-form-label'>Provide Location</label>
            <p className='location-text'>(Provide location for better visibility)</p>
          </div>
          <div className="location-btn-container">
            <button className="location-btn hoverEffect" type="button" onClick={handleLocation} style={{border : locationBtnBorder}}>{locationText}</button>
          </div> 
        </div>
        <div className="signup-form-element">
            <label htmlFor="imgUpload" className='signup-form-label'>Upload Image</label>
            <input type="file" accept="image/png" onChange={handleUpload} style={{border : imgBorder}} className='img-input'/>
          </div>
        <div className="upload-img">
          <button type="submit" className="signup-submit-btn">Submit</button>
        </div>
      </form>
      </div>
      
    </div>
  )
}

export default ProviderSignup