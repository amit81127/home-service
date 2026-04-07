import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const customerSignup = async (req, res) => {
  try {
    let { fullname, username, password, email, phone, address } = req.body;
    username = username.toLowerCase();
    
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }, { contact: phone }] 
    });

    if (existingUser) {
        if (existingUser.username === username) return res.status(400).json({ field: "username", message: "Username already exists" });
        if (existingUser.email === email) return res.status(400).json({ field: "email", message: "Email already exists" });
        if (existingUser.contact === phone) return res.status(400).json({ field: "phone", message: "Phone number already exists" });
    }

    if (!req.body.location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
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
        role: "customer",
        name: fullname,
        contact: phone,
        address,
        latitude,
        longitude
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({ message: "Customer Sign up sucessfull" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
