import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import axios from "../../api/axios";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

function SearchResult() {
  const { category } = useParams();
  const [providerInfo, setProviderInfo] = useState([]);
  const [categoryName, setCategoryName] = useState(""); 

  const formatCategory = () => {
    if (!category) return;
    const formatted = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    setCategoryName(formatted.trim());
  }

  useEffect(() => {
    formatCategory();
  }, [category]);

  useEffect(() => {
    if (categoryName) {
      getProviderInfo();
    }
  }, [categoryName]);

  const getProviderInfo = () => {
    axios
      .get(`/serviceProviderinfo?category=${categoryName}`)
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.error("Error fetching search results:", err));
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
          <h2>Search Results for "{categoryName}"</h2>
        </div>
      </motion.div>
      <ServiceProviderList providerInfo={providerInfo} text="No experts matched your search" />
      <Footer />
    </div>
  );
}

export default SearchResult;
