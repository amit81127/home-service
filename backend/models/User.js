import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['customer', 'service_provider'], required: true },
  
  // Common profile info
  name: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  
  // Provider only fields
  about: { type: String },
  image_url: { type: String },
  category: { type: String },
  price: { type: Number },
  experience_years: { type: String },
  business_name: { type: String },
  rating: { type: Number, default: 0 },
});

export default mongoose.model('User', userSchema);
