import React from "react";
import "./SkillCard.css";

type SkillCardProps = {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  smallImages?: string[];
  icons?: string[];
  buttonText?: string;
  onExchange?: () => void;
};

export const SkillCard: React.FC<SkillCardProps> = ({
  title,
  subtitle,
  description,
  mainImage,
  smallImages = [],
  icons = [],
  buttonText = "Предложить обмен",
  onExchange,
}) => {
  return (
    <div className="skill-card">
      {/* Левая колонка */}
      <div className="skill-card__info">
        <h2 className="skill-card__title">{title}</h2>
        <h3 className="skill-card__subtitle">{subtitle}</h3>
        <p className="skill-card__description">{description}</p>
        <button className="skill-card__button" onClick={onExchange}>
          {buttonText}
        </button>
      </div>

      {/* Правая колонка */}
      <div className="skill-card__right">
        {/* Иконки сверху над маленькими фото */}
        {icons.length > 0 && (
          <div className="skill-card__icons">
            {icons.map((icon, i) => (
              <button key={i} className="skill-card__icon-btn">
                <img src={icon} alt={`icon-${i}`} className="skill-card__icon-img" />
              </button>
            ))}
          </div>
        )}

        {/* Большое + маленькие фото */}
        <div className="skill-card__images-grid">
          <div className="skill-card__main-wrapper">
            <img src={mainImage} alt="Главная" className="skill-card__main-image" />
          </div>
          <div className="skill-card__small-images">
            {smallImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Малое ${idx + 1}`}
                className="skill-card__small-image"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
