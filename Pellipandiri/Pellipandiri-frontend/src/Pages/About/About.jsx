import React, { useEffect, useState } from "react";
import styles from "./about.module.css";
import { aboutImages, aboutKapuPelliPandiri } from "../../constants";

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.aboutContainer} id="about">
      <div className={styles.aboutHeader}>
        <h2>About Us</h2>
        <p>
          కాపు సాంప్రదాయం, విశ్వాసం మరియు కుటుంబ విలువలను కాపాడుతూ కాపు
          పెళ్లి పందిరి ప్రతి కుటుంబానికి ఆనందం కలిగించే వేదిక.
        </p>
      </div>

      <div className={styles.aboutusBox}>
        {/* Left: Image with soft overlay */}
        <div className={styles.aboutusImg}>
          <img
            key={currentImage}
            src={aboutImages[currentImage]}
            alt="Kapu Pelli Pandiri"
            className={styles.fadeImage}
          />
          <div className={styles.imageOverlay}></div>
        </div>

        {/* Right: Text Content */}
        <div className={styles.aboutusContent}>
          <h3 className={styles.sectionTitle}>కాపు పెళ్లి పందిరి</h3>
          <h4 className={styles.subTitle}>{aboutKapuPelliPandiri.title}</h4>

          {aboutKapuPelliPandiri.intro.map((point, index) => (
            <p key={index} className={styles.aboutPara}>
              {point}
            </p>
          ))}

          <div className={styles.infoBlock}>
            <h5>మా ముఖ్య సిద్ధాంతాలు</h5>
            <ul>
              {aboutKapuPelliPandiri.principles.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.infoBlock}>
            <h5>రిజిస్ట్రేషన్ వివరాలు</h5>
            <ul>
              {aboutKapuPelliPandiri.registration.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.finalNote}>
            <p>{aboutKapuPelliPandiri.message}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
