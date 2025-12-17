import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import FilterPanel from "./FilterPanel/FilterPanel";
import ProfileCard from "./ProfileCard/ProfileCard";

// ToggleBrideGroom Component
const ToggleBrideGroom = ({ selected, onSelect }) => {
  return (
    <div className={styles.toggleWrapper}>
      <button
        className={`${styles.toggleBtn} ${selected === "bride" ? styles.active : ""}`}
        onClick={() => onSelect("bride")}
      >
        Bride
      </button>
      <button
        className={`${styles.toggleBtn} ${selected === "groom" ? styles.active : ""}`}
        onClick={() => onSelect("groom")}
      >
        Groom
      </button>
    </div>
  );
};



// ProfileGrid Component
const ProfileGrid = ({ profiles }) => {
  return (
    <div className={styles.gridWrapper}>
      {profiles.map((p) => (
        <ProfileCard key={p.id} profile={p} />
      ))}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [selectedType, setSelectedType] = useState("bride");
  const [filters, setFilters] = useState({ age: [18, 35], gotram: "", location: "" });

  const [profiles] = useState([
    { id: 1, type: "bride", name: "Anjali", age: 25, gotram: "Kashyap", location: "Delhi", photo: "/Images/bride1.jpg" },
    { id: 2, type: "groom", name: "Rohit", age: 28, gotram: "Bhardwaj", location: "Mumbai", photo: "/Images/groom1.jpg" },
    { id: 3, type: "bride", name: "Pooja", age: 23, gotram: "Vashishtha", location: "Bangalore", photo: "/Images/bride2.jpg" },
    { id: 4, type: "groom", name: "Sahil", age: 30, gotram: "Sharma", location: "Delhi", photo: "/Images/groom2.jpg" },
  ]);

  const filteredProfiles = profiles.filter(
    (p) =>
      p.type === selectedType &&
      p.age >= filters.age[0] &&
      p.age <= filters.age[1] &&
      (filters.gotram ? p.gotram.toLowerCase() === filters.gotram.toLowerCase() : true) &&
      (filters.location ? p.location.toLowerCase() === filters.location.toLowerCase() : true)
  );

  const handleAddProfile = () => {
    alert("Open modal to add new profile!");
  };

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Row */}
      <div className={styles.topRow}>
        <ToggleBrideGroom selected={selectedType} onSelect={setSelectedType} />
        <button className={styles.addBtn} onClick={handleAddProfile}>
          + Add Profile
        </button>
      </div>

      {/* Filter Panel */}
      <FilterPanel filters={filters} setFilters={setFilters} />

      {/* Profile Grid */}
      <ProfileGrid profiles={filteredProfiles} />
    </div>
  );
};

export default Dashboard;
