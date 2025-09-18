import React from "react";
import "./skillCardDetailsUI.css";

type GalleryProps = {
  mainImage?: string;
  smallImages?: string[];
};

export const Gallery: React.FC<GalleryProps> = ({ mainImage, smallImages = [] }) => {
  if (!mainImage && smallImages.length === 0) {
    return <div className="gallery-empty">Нет изображений</div>;
  }

  if (!mainImage && smallImages.length > 0) {
    mainImage = smallImages[0];
    smallImages = smallImages.slice(1);
  }

  return (
    <div className="gallery-grid">
      {mainImage && (
        <div className="gallery-main-wrapper">
          <img src={mainImage} alt="Главная" className="gallery-main-image" />
        </div>
      )}

      {smallImages.length > 0 && (
        <div className="gallery-small-images">
          {smallImages.map((img, idx) => (
            <div key={idx} className="gallery-small-image-wrapper">
              <img src={img} alt={`Малое ${idx + 1}`} className="gallery-small-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
