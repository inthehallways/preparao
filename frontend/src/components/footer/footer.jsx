import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";


const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur onsequat. In reprehen velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <div className="footer-social-icons">
                 <img src={assets.facebook_icon} alt="" />
                 <img src={assets.twitter_icon} alt="" />
                 <img src={assets.linkedin_icon} alt="" />
             </div>
            
         </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="div-footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>0999555996</li>
                <li>contact@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright © 2025 Preparao. All Rights Reserved.</p>
      </div>
  );
};

export default Footer;