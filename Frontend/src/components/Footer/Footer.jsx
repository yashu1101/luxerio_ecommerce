import { Link } from "react-router-dom";
import "./Footer.css";
export const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-left">
        <span className="footer-logo">Luxerio</span>
        <p className="footer-cr-text">
          &copy; 2026 Luxerio. All rights reserved.
        </p>
      </div>
      <div className="footer-center">
        <Link className="footer-links" to="#">
          About Us
        </Link>
        <Link className="footer-links" to="#">
          Customer Support
        </Link>
        <Link className="footer-links" to="#">
          Contact
        </Link>
        <Link className="footer-links" to="#">
          Privacy Policy
        </Link>
      </div>
      <div className="footer-right">
        <span className="footer-sm-heading">
            Follow Us
        </span>
        <Link className="footer-sm-links" to="#">
          Facebook
        </Link>
        <Link className="footer-sm-links" to="#">
          Twitter
        </Link>
        <Link className="footer-sm-links" to="#">
          Instagram
        </Link>
      </div>
    </div>
  );
};
