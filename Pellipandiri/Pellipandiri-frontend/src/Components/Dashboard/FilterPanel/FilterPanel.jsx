import React, { useState } from "react";
import styles from "./FilterPanel.module.css";

const suggestionsData = {
  gotram: ["Bharadwaj", "Vasishta", "Kashyap", "Atri", "Gautam"],
  location: ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi"],
  education: ["B.Tech", "M.Tech", "MBA", "PhD", "BSc", "MSc"],
  profession: ["Engineer", "Doctor", "Teacher", "Business", "Artist"],
};

const FilterPanel = ({ filters, setFilters }) => {
  const min = 18;
  const max = 60;
  const [minVal, maxVal] = filters.age;
  const [activeSuggestions, setActiveSuggestions] = useState({});

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setFilters({ ...filters, age: [value, maxVal] });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setFilters({ ...filters, age: [minVal, value] });
  };

  const handleInputChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    if (value) {
      const filtered = suggestionsData[field].filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setActiveSuggestions({ ...activeSuggestions, [field]: filtered });
    } else {
      setActiveSuggestions({ ...activeSuggestions, [field]: [] });
    }
  };

  const selectSuggestion = (field, value) => {
    setFilters({ ...filters, [field]: value });
    setActiveSuggestions({ ...activeSuggestions, [field]: [] });
  };

  const renderInputWithSuggestions = (label, field, placeholder) => (
    <div className={styles.filterItem}>
      <label>{label}:</label>
      <input
        type="text"
        placeholder={placeholder}
        value={filters[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        autoComplete="off"
      />
      {activeSuggestions[field] && activeSuggestions[field].length > 0 && (
        <ul className={styles.suggestions}>
          {activeSuggestions[field].map((item) => (
            <li key={item} onClick={() => selectSuggestion(field, item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className={styles.filterWrapper}>
      {/* Age Range */}
      <div className={styles.filterItem}>
        <label>Age:</label>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}></div>
          <div
            className={styles.sliderRange}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          ></div>

          {/* Min Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={handleMinChange}
            className={`${styles.thumb} ${styles.thumbLeft}`}
            style={{ zIndex: minVal >= maxVal ? 6 : 4 }}
          />

          {/* Max Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={handleMaxChange}
            className={`${styles.thumb} ${styles.thumbRight}`}
            style={{ zIndex: maxVal <= minVal ? 6 : 5 }}
          />

          {/* Thumb Value Indicators */}
          <div
            className={styles.thumbValue}
            style={{ left: `${minPercent}%`, zIndex: 10 }}
          >
            {minVal} yrs
          </div>
          <div
            className={styles.thumbValue}
            style={{ left: `${maxPercent}%`, zIndex: 10 }}
          >
            {maxVal} yrs
          </div>

        </div>
      </div>

      {/* Input suggestions */}
      {renderInputWithSuggestions("Gotram", "gotram", "Enter Gotram")}
      {renderInputWithSuggestions("Location", "location", "Enter City")}
      {renderInputWithSuggestions("Education", "education", "Enter Education")}
      {renderInputWithSuggestions(
        "Profession",
        "profession",
        "Enter Profession"
      )}

      {/* Marital Status */}
      <div className={styles.filterItem}>
        <label>Marital Status:</label>
        <select
          value={filters.maritalStatus}
          onChange={(e) =>
            setFilters({ ...filters, maritalStatus: e.target.value })
          }
        >
          <option value="">Any</option>
          <option value="neverMarried">Never Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
