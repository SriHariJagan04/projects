import React, { useEffect, useState } from "react";
import styles from "./typewriter.module.css";

const TypingEffect = ({ text }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const timeoutIds = [];
    text.split("").forEach((char, index) => {
      const timeoutId = setTimeout(() => {
        setLetters((prev) => [...prev, char]);
      }, index *10); // Adjust speed here
      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [text]);

  return (
    <div className={styles.typingContainer}>
      {letters.map((char, index) => (
        <span
          key={index}
          className={styles.char}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default TypingEffect;
