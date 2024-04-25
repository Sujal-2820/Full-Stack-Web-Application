// components/Footer.js

import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-row footer-primary">
        <div className="footer-column footer-about">
          <h3>Full Stack Project</h3>
          <p>
            A Full Stack Web Application integrates front-end and back-end
            technologies to create dynamic and interactive digital platforms. It
            combines UI design, functionality, server-side logic, and database
            management, delivering robust and scalable solutions to users.
          </p>
        </div>
        <div className="footer-column footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#footer-faq">F.A.Q</a>
            </li>
            <li>
              <a href="#footer-cookies-policy">Cookies Policy</a>
            </li>
            <li>
              <a href="#footer-terms-of-services">Terms Of Service</a>
            </li>
            <li>
              <a href="#footer-support">Support</a>
            </li>
            <li>
              <a href="#footer-careers">About</a>
            </li>
          </ul>
        </div>
        <div className="footer-column footer-subscribe">
          <h3>Subscribe</h3>
          <div>
            <input type="email" placeholder="Your email id here" />
            <button>Subscribe</button>
          </div>
          <div className="footer-social">
            <i className="fa-brands fa-facebook-square"></i>
            <i className="fa-brands fa-instagram-square"></i>
            <i className="fa-brands fa-twitter-square"></i>
          </div>
        </div>
      </div>

      <div className="footer-row footer-copyright">
        <p>Copyright &copy; 2024 FullStackProject | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
