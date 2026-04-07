import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'
import { motion } from "framer-motion";
import './About.css'

function About() {
  const containerHeader = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  return (
    <>
      <Navbar />
      <div className="about-page">
        <motion.h1 initial="hidden" animate="visible" variants={containerHeader}>
          Our Story
        </motion.h1>
        
        <motion.section initial="hidden" animate="visible" variants={sectionVariant} className="about-section">
          <p>
            Servease is a premium home service ecosystem designed to redefine how you manage your living space. We bridge the gap between discerning homeowners and elite service professionals through a sophisticated digital interface. In a world where time is the ultimate luxury, Servease delivers reliability, transparency, and excellence directly to your doorstep.
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" variants={sectionVariant} className="about-section">
          <h2>Our Empowering Mission</h2>
          <p>
            We are on a journey to digitize home maintenance across the globe. By vetting every professional and streamlining the booking process, we ensure that every service delivered is a testament to our commitment to quality. Our goal is to create a marketplace where trust is the default and excellence is the standard.
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" variants={sectionVariant} className="about-section">
          <h2>The Servease Edge</h2>
          <ul className="list-items">
            <li>Instant Professional Matching</li>
            <li>Curated Expert Network</li>
            <li>Transparent Upfront Pricing</li>
            <li>Seamless Digital Payments</li>
            <li>Multi-category Excellence</li>
            <li>Verified Service History</li>
          </ul>
        </motion.section>

        <motion.section initial="hidden" animate="visible" variants={sectionVariant} className="about-section">
          <h2>Our Vision for the Future</h2>
          <p>
            Beyond just a booking platform, we envision Servease as a cornerstone of modern smart living. We are continuously evolving our network and technology to empower skilled professionals and provide homeowners with an unparalleled peace of mind.
          </p>
        </motion.section>
      </div>
      <Footer/>
    </>
  );
}

export default About;
