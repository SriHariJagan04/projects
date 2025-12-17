import React, { useState } from "react";
import styles from "./contactForm.module.css";

const TextInput = ({ name, label, value, onChange }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.textInput}>
      <label
        className={focus || value !== "" ? styles.labelFocus : ""}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={focus || value !== "" ? styles.inputFocus : ""}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

const TextArea = ({ name, label, value, onChange, }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.textArea}>
      <label
        className={focus || value !== "" ? styles.labelFocus : ""}
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        className={focus || value !== "" ? styles.inputFocus : ""}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`${styles.container} rightBlock`}>
      <div className={styles.card}>
        <h1>Send us a Message!</h1>
        <form className={styles.form}>
          <TextInput
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextArea
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Send
          </button>

        </form>
      </div>
    </div>
  );
};

export default ContactForm;
