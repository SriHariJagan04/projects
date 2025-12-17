import React from "react";
import styles from "./clients.module.css";
import ClientCard from "./ClientCard";

import { clientData } from '../../data'


const Clients = () => {
  

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Clients Say</h2>
      {clientData.map((client, i) => (
        <ClientCard key={i} {...client} />
      ))}
    </div>
  );
};

export default Clients;
