import React from "react";
import styles from "./serviceCard.module.css";

const ServiceCard = ({ isVisible, setIsVisible, name, img, description }) => {
  return (
    <div className={`${styles.serviceCard} block`}>
      {!isVisible && <h2 className={styles.serviceTitle}>{name}</h2>}

      <button
        className={`${styles.toggleBtn} ${isVisible ? styles.hideBtn : styles.showBtn}`}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"}
      </button>

      {isVisible && (
        <div className={styles.cardContent}>
          <div className={styles.serviceImg}>
            <img src={img} alt={name} />
          </div>

          <div className={styles.textContent}>
            <h3>{name}</h3>
            <ul>
              {description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
