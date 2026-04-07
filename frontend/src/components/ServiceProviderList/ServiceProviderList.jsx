import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "../../api/axios";
import { useState } from "react";
import "./ServiceProvider.css";

const ServiceProviderList = ({ providerInfo, text }) => {
  const navigate = useNavigate();
  const [bookingLoading, setBookingLoading] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthenticated = !!localStorage.getItem('token') && !!user;

  const handleBooking = async (provider) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    if (user.role !== 'customer') {
      alert("Only customers can book services.");
      return;
    }

    setBookingLoading(provider.user_id);
    try {
      await axios.post('/bookings', {
        providerId: provider.user_id,
        category: provider.category,
        price: provider.price
      });
      alert(`Booking confirmed for ${provider.business_name}!`);
      navigate('/Bookings');
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setBookingLoading(null);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="provider-section max-width">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="provider-grid"
      >
        {providerInfo.map((provider, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ y: -8 }}
            className="provider-card-premium"
          >
            <div className="provider-image-container">
              <img
                src={provider.image_url}
                alt={provider.business_name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/No_Image_Available.jpg";
                }}
              />
              <div className="category-badge">{provider.category}</div>
            </div>
            
            <div className="provider-content">
              <div className="provider-header">
                <h3>{provider.business_name}</h3>
                <div className="provider-rating">
                  <StarIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                  <span>{provider.rating || 4.5}</span>
                </div>
              </div>
              
              <div className="provider-subinfo">
                <span className="provider-owner">by {provider.name}</span>
                <span className="provider-price">₹{provider.price}/hr</span>
              </div>
              
              <div className="provider-location">
                <LocationOnIcon sx={{ fontSize: 16 }} />
                <span>{provider.address}</span>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                disabled={bookingLoading === provider._id}
                onClick={() => handleBooking(provider)}
                className="book-now-btn"
              >
                {bookingLoading === provider._id ? "Booking..." : "Book Assignment"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {providerInfo.length === 0 && (
        <div className="empty-state">
          <p>{text}</p>
        </div>
      )}
    </section>
  );
};

export default ServiceProviderList;
