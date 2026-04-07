import bcrypt from "bcrypt";
import User from "../models/User.js";

export const providerSignup = async (req, res) => {
  try {
    let {
      fullname, username, password, email, phone,
      category, experience, address, description, price, business_name
    } = req.body;

    username = username.toLowerCase();
    
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }, { contact: phone }] 
    });

    if (existingUser) {
        if (existingUser.username === username) return res.status(400).json({ field: "username", message: "Username already exists" });
        if (existingUser.email === email) return res.status(400).json({ field: "email", message: "Email already exists" });
        if (existingUser.contact === phone) return res.status(400).json({ field: "phone", message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageName = req.file ? req.file.filename : null;
    let latitude = null;
    let longitude = null;

    if (req.body.location) {
      const location = JSON.parse(req.body.location);
      latitude = location.latitude;
      longitude = location.longitude;
    }

    const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role: "service_provider",
        name: fullname,
        contact: phone,
        address,
        latitude,
        longitude,
        about: description,
        image_url: imageName,
        category,
        price,
        experience_years: experience,
        business_name
    });

    await newUser.save();

    res.status(201).json({ message: "Provider signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
