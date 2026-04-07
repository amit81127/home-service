import { motion } from "framer-motion";
import axios from "../../api/axios";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState, useRef } from "react";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import CategoryList from "../../components/CategoryList/CategoryList";
import Footer from "../../components/Footer/Footer";
import Typewriter from "typewriter-effect";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [providerInfo, setProviderInfo] = useState([]);
  const [category, setCategory] = useState("Popular");
  const serviceRef = useRef(null);

  useEffect(() => {
    const getCategoriesList = async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Categories error:", err);
      }
    };
    getCategoriesList();
  }, []);

  useEffect(() => {
    const getProviderInfo = async () => {
      try {
        const res = await axios.get(`/serviceProviderinfo?category=${category}`);
        setProviderInfo(res.data);
      } catch (err) {
        console.error("Providers error:", err);
      }
    };
    getProviderInfo();
  }, [category]);

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-section-container"
        >
          <div className="hero">
            <h1 className="headline">
              Trusted <span className="blue">Home Services</span> <br />
              At Your Fingertips
            </h1>
            <p className="subheadline">
              Expert repairs, cleaning, and maintenance services delivered by verified professionals right at your doorstep.
            </p>
          </div>
          
          <Searchbar />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="type-writer-container"
          >
            <span>Available at </span>
            <span className="type-writer-text">
              <Typewriter
                options={{
                  strings: ["Srinagar", "Chauras", "Srikot", "Kirtinagar"],
                  autoStart: true,
                  loop: true,
                  pauseFor: 3000,
                }}
              />
            </span>
          </motion.div>
        </motion.div>
      </section>

      <CategoryList categoryList={categories} />
      
      <div className="providers-section max-width">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             Best {category} Providers
          </motion.h2>
          <p className="section-tagline">Showing top-rated professionals in your area</p>
        </div>
        
        <ServiceProviderList
          providerInfo={providerInfo}
          currentCategory={category}
          text={`No ${category} providers found at the moment.`}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
