import React from "react";
import styles from './Gallery.module.css';

type GalleryProps = {
  mainImage?: string;
  smallImages?: string[];
};

export const Gallery: React.FC<GalleryProps> = ({ mainImage, smallImages = [] }) => {
  if (!mainImage && smallImages.length === 0) {
    return <div className={styles.galleryEmpty}>Нет изображений</div>;
  }

  if (!mainImage && smallImages.length > 0) {
    mainImage = smallImages[0];
    smallImages = smallImages.slice(1);
  }

  return (
    <div className={styles.galleryGrid}>
      {mainImage && (
        <div className={styles.mainWrapper}>
          <img src={`/db/skills-photo/${mainImage}`} alt="Главная" className={styles.mainImage} />
        </div>
      )}

      {smallImages.length > 0 && (
        <div className={styles.smallImages}>
          {smallImages.map((img, i) => (
            <div key={i} className={styles.smallImageWrapper}>
              <img src={`/db/skills-photo/${img}`} alt={`Малое ${i + 1}`} className={styles.smallImage} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
