import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.row}>
            {/* Logo & About */}
            <div className={styles.footerWidget}>
              <div className={styles.footerLogo}>
                <a href="/">
                  <img
                    src="/Images/logo.png"
                    className={styles.imgFluid}
                    alt="logo"
                  />
                </a>
                <a href="/" >
                  <h1 className={styles.footerTitle}>కాపు పెళ్లి పందిరి</h1>
                </a>
              </div>
              <p className={styles.footerText}>
              Yalla Venkata Satyanarayana (YVS), <br /> Dr 68-8-11, F2 Lakshmi Enclave,<br /> Glow Park Beside Road, <br /> Lala Cheruvu, Rajahmundry - 533106, <br /> Andhra Pradesh, INDIA.
              </p>
              <div className={styles.footerSocialIcon}>
                <span>Follow us</span>
                <a href="#">
                  <i className={`fab fa-facebook-f ${styles.facebookBg}`}></i>
                </a>
                <a href="#">
                  <i className={`fab fa-twitter ${styles.twitterBg}`}></i>
                </a>
                <a href="#">
                  <i className={`fab fa-google-plus-g ${styles.googleBg}`}></i>
                </a>
              </div>
            </div>

            {/* Useful Links */}
            <div className={styles.footerWidget}>
              <h3 className={styles.footerWidgetHeading}>Useful Links</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Gallery</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            {/* Subscription Form */}
            <div className={styles.footerWidget}>
              <h3 className={styles.footerWidgetHeading}>Subscribe</h3>
              <p className={styles.footerText}>
                Don’t miss to subscribe to our new feeds, kindly fill the form
                below.
              </p>
              <div className={styles.subscribeForm}>
                <form>
                  <input type="text" placeholder="Email Address" />
                  <button>
                    <i className="fab fa-telegram-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyrightArea}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.copyrightText}>
              <p>Copyright &copy; 2024, All Rights Reserved</p>
            </div>
            <div className={styles.footerMenu}>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Policy</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
