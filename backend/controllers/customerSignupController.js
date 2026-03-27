import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const customerSignup = async (req, res) => {
  try {
    let { fullname, username, password, email, phone, address } = req.body;

    username = username.toLowerCase();
    const role = "customer";
    const checkUsername = await pool.query(
      "SELECT id FROM users WHERE username=$1",
      [username],
    );

    if (checkUsername.rows.length > 0) {
      return res.status(400).json({
        field: "username",
        message: "Username already exists",
      });
    }

    const checkEmail = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);

    if (checkEmail.rows.length > 0) {
      return res.status(400).json({
        field: "email",
      });
    }

    const checkPhone = await pool.query(
      "SELECT user_id FROM customer_info WHERE contact=$1",
      [phone],
    );

    if (checkPhone.rows.length > 0) {
      return res.status(400).json({
        field: "phone",
        message: "Phone number already exists",
      });
    }

    if (!req.body.location) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users 
       (username, password, email, role)
       VALUES ($1,$2,$3,$4)
       RETURNING id`,
      [username, hashedPassword, email, role],
    );

    const user_id = result.rows[0].id;
    let latitude = null;
    let longitude = null;

    if (req.body.location) {
      const location = JSON.parse(req.body.location);
      latitude = location.latitude;
      longitude = location.longitude;
    }

    const insertIntoCustomers = await pool.query(
      `INSERT INTO customer_info 
       (user_id, name, contact, address, latitude, longitude)
       VALUES ($1,$2,$3,$4 , $5, $6)
       RETURNING user_id`,
      [user_id, fullname, phone, address, latitude, longitude],
    );

    const token = jwt.sign(
      {
        id: user_id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "Customer Sign up sucessfull",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};
