import React from "react";
import styles from "./aboutCompany.module.css";
import CardSlider from "../../Components/CardsSlider/CardSlider";
import CompanyCarousel from "../../Components/CompanyCarousel/CompanyCarousel";

import { aboutCompany } from '../../data'

const AboutCompany = () => {

  const { dec } = aboutCompany

  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.aboutTitle}>Key Facts About <b>NayaDrishti</b></h3>
      <div>
        <CardSlider />
      </div>
      <p className={styles.description}>
        {dec}
      </p>

      <div>
        <CompanyCarousel />
      </div>
    </div>
  );
};

export default AboutCompany;
