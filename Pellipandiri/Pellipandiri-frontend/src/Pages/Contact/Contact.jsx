import React from "react";
import styles from "./contact.module.css";
import ContactItem from "../../Components/ContactItem/ContactItem";
import ContactForm from "../../Components/ContactForm/ConatctForm";

import { contactList } from "../../constants";

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 id={styles.contactTitle}>Contact Us</h1>
      <div className={styles.contactInfo}>
        {contactList.map((data, index) => (
          <ContactItem key={index} {...data} />
        ))}
      </div>

      <div className={styles.contactBox}>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
        <div className={`${styles.contactLocation} rightBlock`}>
          <iframe
            className={styles.locationMap}
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3814.8925037986396!2d81.80038067515683!3d17.028942083798476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAxJzQ0LjIiTiA4McKwNDgnMTAuNiJF!5e0!3m2!1sen!2sin!4v1744087334492!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;