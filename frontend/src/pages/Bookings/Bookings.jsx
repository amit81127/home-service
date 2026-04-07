import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import './Bookings.css';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const endpoint = user.role === 'customer' ? '/customer/bookings' : '/provider/bookings';
        const response = await axios.get(endpoint);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user.role]);

  if (loading) return <div className="loading-container">Loading your bookings...</div>;

  return (
    <div className="bookings-page">
      <Navbar />
      <div className="bookings-container max-width">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="page-title"
        >
          My Bookings
        </motion.h1>

        <div className="bookings-list">
          {bookings.length === 0 ? (
            <div className="empty-bookings glass-effect">
              <h3>No bookings found</h3>
              <p>You haven't scheduled any services yet.</p>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <motion.div 
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="booking-card glass-effect"
              >
                <div className="booking-info">
                  <div className="booking-main">
                    <h3>{booking.category} Service</h3>
                    <p className="booking-id">ID: {booking._id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div className="booking-participants">
                    {user.role === 'customer' ? (
                      <div>
                        <strong>Provider:</strong> {booking.providerId?.business_name || 'N/A'}
                        <p className="contact-info">Contact: {booking.providerId?.phone}</p>
                      </div>
                    ) : (
                      <div>
                        <strong>Customer:</strong> {booking.customerId?.fullname || 'N/A'}
                        <p className="contact-info">Contact: {booking.customerId?.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="booking-status-section">
                  <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                  <div className="booking-meta">
                    <p className="price">₹{booking.price}</p>
                    <p className="date">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bookings;
