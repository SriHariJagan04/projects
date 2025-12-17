import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import styles from "./gallery.module.css";
import { galleryImages } from "../../constants";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const images =
    selectedCategory === "All"
      ? Object.values(galleryImages).flat()
      : galleryImages[selectedCategory];

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>Gallery</h1>

      {/* Category Buttons */}
      <div className={styles.galleryTypes}>
        {Object.keys(galleryImages).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category ? styles.activeCategory : ""
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Photo Gallery */}
      <PhotoProvider key={selectedCategory}>
        <div className={styles.galleryGrid}>
          {images.map((src, index) => (
            <PhotoView src={src} key={index}>
              <div className={styles.galleryCard}>
                <img src={src} alt={`${selectedCategory}-${index}`} />
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default Gallery;
