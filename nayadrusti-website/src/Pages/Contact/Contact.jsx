import React from "react";
import styles from "./contact.module.css";
import {
  Phone,
  Mail,
  MessageCircleMore,
  UploadCloud,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.heading}>Need a Consultation?</h2>
          <p className={styles.subheading}>
            Drop us a line! We are here to answer your questions 24/7.
          </p>

          <form className={styles.form}>
            <textarea placeholder="How can we help you?" rows={5}></textarea>

            <div className={styles.uploadSection}>
              <UploadCloud size={18} />
              Drag and drop or <span>browse</span> to upload your file(s)
            </div>

            <div className={styles.row}>
              <input type="text" placeholder="Full name" />
              <input type="text" placeholder="Company" />
            </div>

            <div className={styles.row}>
              <input type="email" placeholder="Work email" required />
              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                pattern="[6-9]{1}[0-9]{9}"
                title="Enter a valid 10-digit Indian phone number"
                required
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>

            <button type="submit" className={styles.sendBtn}>
              Send
            </button>
          </form>
        </div>

        <div className={styles.right}>
          <h3 className={styles.contactTitle}>Get in touch instantly</h3>
          <ul className={styles.contactList}>
            <li>
              <a href="tel:+918920824291" className={styles.contactLink}>
                <Phone size={18} /> Call us
              </a>
            </li>
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nayadrishticonsulting@gmail.com"
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={18} /> Email us
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/918920824291"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <MessageCircleMore size={18} color="green" /> WhatsApp
              </a>
            </li>
          </ul>

          <h4 className={styles.sectionTitle}>For journalists</h4>
          <p className={styles.linkRow}>
            <a
              href="https://www.linkedin.com/company/nayadrishti"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <Linkedin size={18} /> Get unique insights
            </a>
          </p>

          <h4 className={styles.sectionTitle}>Join our team</h4>
          <p className={styles.linkRow}>
            <UploadCloud size={18} /> Upload your CV
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
