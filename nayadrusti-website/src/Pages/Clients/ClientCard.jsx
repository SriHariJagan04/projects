import React from "react";
import styles from "./clients.module.css";
import { Linkedin, FileText } from "lucide-react";

const ClientCard = ({
  logo,
  avatar,
  name,
  role,
  linkedIn,
  feedback,
  rating,
  originalLink,
  projectLink,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.columns}>
        {/* Left Column: Logo */}
        <div className={styles.left}>
          <img src={logo} alt="Company logo" className={styles.logo} />
        </div>

        {/* Right Column: Content */}
        <div className={styles.right}>
          <div className={styles.person}>
            <img src={avatar} alt={name} className={styles.avatar} />
            <div>
              <div className={styles.name}>
                {name}{" "}
                {linkedIn && (
                  <a href={linkedIn} target="_blank" rel="noreferrer">
                    <Linkedin size={16} color="#0A66C2" />
                  </a>
                )}
              </div>
              <div className={styles.role}>{role}</div>
            </div>
          </div>

          <p className={styles.feedback}>{feedback}</p>

          <div className={styles.rating}>
            {"★".repeat(rating)}
            <span className={styles.emptyStars}>
              {"☆".repeat(5 - rating)}
            </span>
          </div>

          <div className={styles.links}>
            {originalLink && (
              <a href={originalLink} target="_blank" rel="noreferrer">
                <FileText size={16} /> Check the original
              </a>
            )}
            {projectLink && (
              <a href={projectLink} target="_blank" rel="noreferrer">
                Check the project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
