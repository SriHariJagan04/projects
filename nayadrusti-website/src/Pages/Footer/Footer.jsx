import React from "react";
import styles from "./footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    sessionStorage.setItem("scrollTo", id);
    navigate("/");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1: About */}
        <div className={styles.column}>
          <h3>Company</h3>
          <p>
            We provide innovative tech solutions that help businesses grow and
            succeed in the digital era.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => handleNavClick("about")}>About Us</li>
            <li onClick={() => handleNavClick("services")}>Services</li>
            <li onClick={() => handleNavClick("projects")}>Careers</li>
            <li onClick={() => handleNavClick("contact")}>Contact</li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className={styles.column}>
          <h3>Contact</h3>
          <p>Email: nayadrishticonsulting@gmail.com</p>
          <p>Phone: +91 89208 24291</p>
          <p>Location: Hyderabad, Telangana</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          Copyright © {new Date().getFullYear()} NayaDrishti - All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
