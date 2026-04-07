import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar/Navbar';
import './ProviderDashboard.css';

function ProviderDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/providerDashboard');
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Provider Dashboard</h1>
        <div className="profile-section">
          {userData.image_url && <img src={userData.image_url} alt="Profile" className="profile-image" />}
          <div className="profile-details">
            <div className="detail-item">
              <strong>Provider Name</strong>
              <p>{userData.fullname || userData.name}</p>
            </div>
            <div className="detail-item">
              <strong>Business Handle</strong>
              <p>{userData.business_name}</p>
            </div>
            <div className="detail-item">
              <strong>Service Category</strong>
              <p>{userData.category}</p>
            </div>
            <div className="detail-item">
              <strong>Experience</strong>
              <p>{userData.experience_years || userData.experience} Years</p>
            </div>
            <div className="detail-item">
              <strong>Base Price</strong>
              <p>₹{userData.price}/hr</p>
            </div>
            <div className="detail-item">
              <strong>Email Address</strong>
              <p>{userData.email}</p>
            </div>
            <div className="detail-item">
              <strong>Contact Number</strong>
              <p>{userData.phone || userData.contact}</p>
            </div>
            <div className="detail-item">
              <strong>Rating</strong>
              <p>{userData.rating || 0} ⭐</p>
            </div>
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <strong>Business Address</strong>
              <p>{userData.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderDashboard;
