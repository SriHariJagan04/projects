// StoryCard.jsx
import React from 'react';
import styles from './stories.module.css';
import { ArrowRight } from 'lucide-react';

const StoryCard = ({ image, title, onClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.button} onClick={onClick}>
          Project details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
