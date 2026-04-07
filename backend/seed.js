import mongoose from 'mongoose';
import Category from './models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    const categories = [
      { name: "Cleaning", icon: "cleaning", color: "#FF5733" },
      { name: "Repair", icon: "construction", color: "#33FF57" },
      { name: "Plumbing", icon: "plumbing", color: "#3357FF" },
      { name: "Shifting", icon: "local_shipping", color: "#F333FF" },
      { name: "Painting", icon: "format_paint", color: "#FF33A1" },
      { name: "Electrical", icon: "electrical_services", color: "#FFD433" },
      { name: "Gardening", icon: "gardening", color: "#33FFD4" },
      { name: "Pest Control", icon: "pest_control", color: "#D433FF" },
    ];

    for (const cat of categories) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await new Category(cat).save();
        console.log(`Added category: ${cat.name}`);
      }
    }

    console.log("Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedCategories();
