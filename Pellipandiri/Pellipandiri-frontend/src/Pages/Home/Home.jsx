import React from "react";
import styles from "./home.module.css";


const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHeading}>
        <h3>MATCH MAKER</h3>
        <b>Your Dream Wedding</b>
        <b>Made Perfect</b>
      </div>
    </div>
  );
};

export default Home;
