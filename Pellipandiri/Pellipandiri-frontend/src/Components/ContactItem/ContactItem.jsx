import React from "react";
import styles from './contactItem.module.css'

const ContactItem = ({icon, name, description}) => {
  const className = styles[name.toLowerCase()] || ""
  return (
    <div className={`${styles.contactItem} ${className} topBlock`}>
      <i className={icon} /> 
      <b>{name}</b>
      <p className={styles.description}>
        {description.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default ContactItem;
