import React from 'react';
import styles from './storieModel.module.css';
import { X } from 'lucide-react';
import { marked } from 'marked';

const StorieModel = ({ title, content, image, onClose }) => {
  const htmlContent = marked(content); // Converts markdown to HTML

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <img src={image} alt={title} className={styles.image} />

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default StorieModel;
