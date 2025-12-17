import React from 'react';
import styles from './industry.module.css';
import { ArrowRight  } from 'lucide-react';

const IndustryCard = ({ icon, title }) => {
  return (
    <div className={`${styles.card}`}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <ArrowRight  className={styles.arrow} size={20} />
    </div>
  );
};

export default IndustryCard;
