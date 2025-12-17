// Stories.jsx
import React, { useState } from "react";
import styles from "./stories.module.css";
import StoryCard from "./StoryCard";
import { projectDetails } from "../../data";
import StorieModel from "../../Components/StorieModel/StorieModel";

const Stories = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Project Details</h2>
      <div className={styles.grid}>
        {projectDetails.map((story, idx) => (
          <StoryCard
            key={idx}
            image={story.image}
            title={story.title}
            onClick={() => setSelectedProject(story)}
          />
        ))}
      </div>

      {selectedProject && (
        <StorieModel
          title={selectedProject.title}
          content={selectedProject.details}
          image={selectedProject.image}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Stories;
