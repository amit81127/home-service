import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import axios from "../../api/axios";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import "./Services.css";

function Services() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo] = useState([]);
  const [categoryName, setCategoryName] = useState(""); 

  const handleCategoryChange = (e) => {
    navigate(`/Services/${e.target.value}`);
  };

  const categoryLabels = {
    Popular: "Popular",
    Cleaning: "Expert Cleaning",
    Repair: "Quick Repairs",
    Plumbing: "Master Plumbing",
    Electrical: "Electrical Work",
    Shifting: "Safe Shifting",
    Gardening: "Lush Gardening",
    Painting: "Professional Painting",
    PestControl: "Pest Control",
  };

  useEffect(() => {
    setCategoryName(categoryLabels[category] || category);
    getProviderInfo();
  }, [category]);

  const getProviderInfo = () => {
    axios
      .get(`/serviceProviderinfo?category=${category}`)
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.error("Error fetching providers:", err));
  };

  return (
    <div className="services-page">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="services-top"
      >
        <div className="service-top-heading">
          <h2>{categoryName}</h2>
        </div>
        
        <div className="category-select-container">
          <label htmlFor="selectCategory">Category</label>
          <select
            name="selectCategory"
            className="select-category"
            id="selectCategory"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="Popular">Popular</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Repair">Repairs</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Shifting">Shifting</option>
            <option value="Painting">Painting</option>
            <option value="Electrical">Electrical</option>
            <option value="Gardening">Gardening</option>
            <option value="PestControl">Pest Control</option>
          </select>
        </div>
      </motion.div>

      <ServiceProviderList providerInfo={providerInfo} text="No experts found in this category" />
      <Footer />
    </div>
  );
}

export default Services;
