import React, { useState } from "react";
import styles from "./services.module.css";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";

import { servicesData } from "../../constants";

const Services = () => {
  const [showContent, setShowContent] = useState("సంబంధం");
  return (
    <div className={styles.servicesContainer}>
      <h2 id={styles.serviceTitle}>Our Services</h2>
      <div className={styles.ServicesList}>
        {servicesData.map((data) => (
          <ServiceCard
            key={data.id}
            {...data}
            isVisible={showContent === data.name}
            setIsVisible={() =>
              setShowContent((prevState) =>
                prevState === data.name ? null : data.name
              )
            }
          />
        ))}

        {/* <ServiceCard
          isVisible={showContent === "team"}
          setIsVisible={() =>
            setShowContent((prevState) =>
              prevState === "team" ? null : "team"
            )
          }
        /> */}
       
      </div>
    </div>
  );
};

export default Services;
