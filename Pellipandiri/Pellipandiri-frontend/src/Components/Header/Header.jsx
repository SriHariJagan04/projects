import React, { useState } from "react";
import { Link } from "react-scroll";
import styles from "./header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftLogo}>
        <img src="Images/logo.png" alt="logo" width={100}/>
        <h1 id={styles.title}>కాపు పెళ్లి పందిరి</h1>
      </div>

      {/* Mobile Menu Icon */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`${styles.navList} ${menuOpen ? styles.active : ""}`}>
        {["home", "about", "services", "gallery", "contact"].map((section) => (
          <li key={section}>
            <Link
              to={section}
              smooth={true}
              duration={500}
              offset={-78}
              spy={true}
              activeClass={styles.activeLink}
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
