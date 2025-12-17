import React from "react";
import styles from "./ProfileCard.module.css";

const ProfileCard = ({ profile }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={profile.photo} alt={profile.name} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h4>{profile.name}</h4>
        <p>{profile.age} yrs, {profile.gotram}</p>
        <p>{profile.location}</p>
        <p>{profile.education}</p>
        <p>{profile.profession}</p>
        <p>{profile.maritalStatus || "Never Married"}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
