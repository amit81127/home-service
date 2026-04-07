import { Link } from "react-router-dom";
import logo from '/logo2.png'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-container max-width">
        <div className="footer-brand">
          <Link to='/' className="footer-logo">
            <img src={logo} alt="logo" />
            <span className="logo-text">SERVEASE</span>
          </Link>
          <p className="footer-tagline">
            Providing premium home services that you can trust. Our verified professionals are ready to help.
          </p>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link to="/Services/Cleaning">Cleaning</Link></li>
              <li><Link to="/Services/Repair">Repairs</Link></li>
              <li><Link to="/Services/Plumbing">Plumbing</Link></li>
              <li><Link to="/Services/Electrical">Electrical</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/Services/Popular'>Services</Link></li>
              <li><Link to='/About'>About Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
             <h4>Support</h4>
             <ul className="support-list">
               <li><a href="mailto:support@servease.com">support@servease.com</a></li>
               <li><a href="tel:+918218788163">+91 82187 88163</a></li>
               <li>Srinagar, Uttarakhand</li>
             </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="max-width bottom-content">
          <p>&copy; {new Date().getFullYear()} Servease. All rights reserved.</p>
          <div className="social-links">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
